;; Token trait definition
(use-trait ft-trait .sip-010-trait.sip-010-trait)

;; Define the contract
(define-data-var token-address (optional principal) none)
(define-data-var lp-token-address (optional principal) none)
(define-data-var reward-rate uint u100)
(define-data-var last-update-time uint u0)
(define-data-var reward-per-token-stored uint u0)
(define-data-var total-supply uint u0)
(define-data-var owner (optional principal) none)

;; Precision constant
(define-constant PRECISION u1000000)

;; Error constants
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-NOT-INITIALIZED (err u101))
(define-constant ERR-ALREADY-INITIALIZED (err u102))
(define-constant ERR-INSUFFICIENT-BALANCE (err u103))

(define-map staker-info 
  ((staker principal)) 
  ((balance uint) (reward-debt uint))
)

;; Initialize the contract
(define-public (initialize (token <ft-trait>) (lp-token <ft-trait>))
  (let 
    (
      (caller tx-sender)
    )
    (asserts! (is-none (var-get owner)) ERR-ALREADY-INITIALIZED)
    (var-set token-address (some (contract-of token)))
    (var-set lp-token-address (some (contract-of lp-token)))
    (var-set last-update-time block-height)
    (var-set owner (some caller))
    (ok success)
  )
)

;; is-owner function
(define-private (is-owner)
  (is-eq (some tx-sender) (var-get owner))
)

;; Update reward variables
(define-private (update-reward)
  (let (
    (current-time block-height)
    (time-elapsed (- current-time (var-get last-update-time)))
    (rewards (/ (* time-elapsed (var-get reward-rate)) PRECISION))
    (current-supply (var-get total-supply))
  )
    (if (> current-supply u0)
      (var-set reward-per-token-stored 
        (+ (var-get reward-per-token-stored) 
           (/ (* rewards PRECISION) current-supply)
        )
      )
      success
    )
    (var-set last-update-time current-time)
    (ok success)
  )
)

;; Stake LP tokens
(define-public (stake (amount uint))
  (let (
    (sender tx-sender)
    (lp-token (unwrap! (var-get lp-token-address) ERR-NOT-INITIALIZED))
    (current-balance (default-to u0 (get balance (map-get? staker-info {staker: sender}))))
  )
    (try! (update-reward))
    (map-set staker-info 
      {staker: sender}
      {
        balance: (+ current-balance amount),
        reward-debt: (/ (* (+ current-balance amount) (var-get reward-per-token-stored)) PRECISION)
      }
    )
    (var-set total-supply (+ (var-get total-supply) amount))
    (try! (contract-call? lp-token transfer amount sender (as-contract tx-sender) none))
    (ok success)
  )
)

;; Withdraw LP tokens
(define-public (withdraw (amount uint))
  (let (
    (sender tx-sender)
    (lp-token (unwrap! (var-get lp-token-address) ERR-NOT-INITIALIZED))
    (staker-data (unwrap! (map-get? staker-info {staker: sender}) ERR-INSUFFICIENT-BALANCE))
    (current-balance (get balance staker-data))
  )
    (asserts! (>= current-balance amount) ERR-INSUFFICIENT-BALANCE)
    (try! (update-reward))
    (map-set staker-info 
      {staker: sender}
      {
        balance: (- current-balance amount),
        reward-debt: (/ (* (- current-balance amount) (var-get reward-per-token-stored)) PRECISION)
      }
    )
    (var-set total-supply (- (var-get total-supply) amount))
    (as-contract (contract-call? lp-token transfer amount tx-sender sender none))
  )
)

;; Claim rewards
(define-public (claim-reward)
  (let (
    (sender tx-sender)
    (token (unwrap! (var-get token-address) ERR-NOT-INITIALIZED))
    (staker-data (unwrap! (map-get? staker-info {staker: sender}) ERR-INSUFFICIENT-BALANCE))
    (balance (get balance staker-data))
    (reward-debt (get reward-debt staker-data))
  )
    (try! (update-reward))
    (let (
      (reward (/ (- (* balance (var-get reward-per-token-stored)) (* reward-debt PRECISION)) PRECISION))
    )
      (map-set staker-info 
        {staker: sender}
        {
          balance: balance,
          reward-debt: (/ (* balance (var-get reward-per-token-stored)) PRECISION)
        }
      )
      (as-contract (contract-call? token transfer reward tx-sender sender none))
    )
  )
)