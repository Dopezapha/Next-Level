;; Token trait definition
(use-trait ft-trait .sip-010-trait.sip-010-trait)

;; Define the contract
(define-data-var token-address (optional principal) none)
(define-data-var lp-token-address (optional principal) none)
(define-data-var reward-rate uint u100)
(define-data-var last-update-time uint u0)
(define-data-var reward-per-token-stored uint u0)
(define-data-var total-supply uint u0)

(define-map staker-info 
  ((staker principal)) 
  ((balance uint) (reward-debt uint))
)

;; Initialize the contract
(define-public (initialize (token principal) (lp-token principal))
  (begin
    (var-set token-address token)
    (var-set lp-token-address lp-token)
    (var-set last-update-time block-height)
    (ok true)
  )
)

;; Update reward variables
(define-private (update-reward)
  (let (
    (current-time block-height)
    (time-elapsed (- current-time (var-get last-update-time)))
    (rewards (/ (* time-elapsed (var-get reward-rate)) u1000000))
  )
    (var-set reward-per-token-stored 
      (+ (var-get reward-per-token-stored) 
         (/ rewards (ft-get-supply (var-get lp-token-address)))
      )
    )
    (var-set last-update-time current-time)
  )
)

;; Stake LP tokens
(define-public (stake (amount uint))
  (let (
    (sender tx-sender)
    (current-balance (default-to u0 (get balance (map-get? staker-info {staker: sender}))))
  )
    (update-reward)
    (map-set staker-info 
      {staker: sender}
      {
        balance: (+ current-balance amount),
        reward-debt: (* (+ current-balance amount) (var-get reward-per-token-stored))
      }
    )
    (ft-transfer? (var-get lp-token-address) amount sender (as-contract tx-sender))
  )
)

;; Withdraw LP tokens
(define-public (withdraw (amount uint))
  (let (
    (sender tx-sender)
    (staker-data (unwrap! (map-get? staker-info {staker: sender}) (err u1)))
    (current-balance (get balance staker-data))
  )
    (asserts! (>= current-balance amount) (err u2))
    (update-reward)
    (map-set staker-info 
      {staker: sender}
      {
        balance: (- current-balance amount),
        reward-debt: (* (- current-balance amount) (var-get reward-per-token-stored))
      }
    )
    (as-contract (ft-transfer? (var-get lp-token-address) amount (as-contract tx-sender) sender))
  )
)

;; Claim rewards
(define-public (claim-reward)
  (let (
    (sender tx-sender)
    (staker-data (unwrap! (map-get? staker-info {staker: sender}) (err u1)))
    (balance (get balance staker-data))
    (reward-debt (get reward-debt staker-data))
  )
    (update-reward)
    (let (
      (reward (- (* balance (var-get reward-per-token-stored)) reward-debt))
    )
      (map-set staker-info 
        {staker: sender}
        {
          balance: balance,
          reward-debt: (* balance (var-get reward-per-token-stored))
        }
      )
      (as-contract (ft-transfer? (var-get token-address) reward (as-contract tx-sender) sender))
    )
  )
)