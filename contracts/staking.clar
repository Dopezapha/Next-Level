;; Smart contract managing Bitcoin staking and optimizing yield strategies.

;; Constants
(define-constant ERR-INSUFFICIENT-STAKE (err u100))
(define-constant ERR-INSUFFICIENT-LIQUIDITY (err u101))
(define-constant ERR-NO-ACTIVE-POSITION (err u102))

;; Data Maps
(define-map btc-stakes principal uint)
(define-map btc-liquidity principal uint)
(define-map usd-liquidity principal uint)
(define-map leveraged-positions principal {btc-amount: uint, leverage: uint})

;; Staking and Yield section
(define-public (stake-btc (amount uint))
  (let ((current-stake (default-to u0 (map-get? btc-stakes tx-sender))))
    (map-set btc-stakes tx-sender (+ current-stake amount))
    (ok amount)))

(define-public (unstake-btc (amount uint))
  (let ((current-stake (default-to u0 (map-get? btc-stakes tx-sender))))
    (asserts! (>= current-stake amount) ERR-INSUFFICIENT-STAKE)
    (map-set btc-stakes tx-sender (- current-stake amount))
    (ok amount)))

;; Liquidity Pool Management section
(define-public (add-liquidity-btc (btc-amount uint) (usd-amount uint))
  (let 
    ((current-btc (default-to u0 (map-get? btc-liquidity tx-sender)))
     (current-usd (default-to u0 (map-get? usd-liquidity tx-sender))))
    (map-set btc-liquidity tx-sender (+ current-btc btc-amount))
    (map-set usd-liquidity tx-sender (+ current-usd usd-amount))
    (ok {btc-added: btc-amount, usd-added: usd-amount})))

(define-public (remove-liquidity-btc (btc-shares uint) (usd-shares uint))
  (let 
    ((current-btc (default-to u0 (map-get? btc-liquidity tx-sender)))
     (current-usd (default-to u0 (map-get? usd-liquidity tx-sender))))
    (asserts! (and (>= current-btc btc-shares) (>= current-usd usd-shares)) ERR-INSUFFICIENT-LIQUIDITY)
    (map-set btc-liquidity tx-sender (- current-btc btc-shares))
    (map-set usd-liquidity tx-sender (- current-usd usd-shares))
    (ok {btc-removed: btc-shares, usd-removed: usd-shares})))

;; BTC Trading with Leverage section
(define-public (open-leveraged-position (btc-amount uint) (leverage uint))
  (begin
    (map-set leveraged-positions tx-sender {btc-amount: btc-amount, leverage: leverage})
    (ok {btc-amount: btc-amount, leverage: leverage})
  )
)

(define-public (close-leveraged-position)
  (let ((position (unwrap! (map-get? leveraged-positions tx-sender) ERR-NO-ACTIVE-POSITION)))
    (map-delete leveraged-positions tx-sender)
    (ok position)))

(define-public (liquidate-leveraged-position (user principal))
  (let ((position (unwrap! (map-get? leveraged-positions user) ERR-NO-ACTIVE-POSITION)))
    (map-delete leveraged-positions user)
    ;; Additional logic for transferring funds would go here
    (ok position)))

;; Read-only functions for querying state
(define-read-only (get-btc-stake (user principal))
  (default-to u0 (map-get? btc-stakes user)))

(define-read-only (get-liquidity (user principal))
  {btc: (default-to u0 (map-get? btc-liquidity user)),
   usd: (default-to u0 (map-get? usd-liquidity user))})

(define-read-only (get-leveraged-position (user principal))
  (map-get? leveraged-positions user))