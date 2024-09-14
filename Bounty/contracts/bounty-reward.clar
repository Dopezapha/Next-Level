;; Bounty or Task Reward Smart Contract

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_INVALID_AMOUNT (err u101))
(define-constant ERR_INSUFFICIENT_BALANCE (err u102))
(define-constant ERR_TASK_NOT_FOUND (err u103))
(define-constant ERR_TASK_NOT_OPEN (err u104))
(define-constant ERR_TASK_ALREADY_COMPLETED (err u105))
(define-constant ERR_CANNOT_COMPLETE_OWN_TASK (err u106))
(define-constant ERR_INVALID_TASK_ID (err u107))
(define-constant ERR_INVALID_DETAILS (err u108))

;; Data variables
(define-data-var task-count uint u0)

;; Maps
(define-map tasks
  { task-id: uint }
  {
    initiator: principal,
    details: (string-utf8 256),
    compensation: uint,
    is-open: bool,
    solver: (optional principal),
    created-at: uint,
    completed-at: (optional uint)
  }
)

;; Private functions
(define-private (is-contract-owner)
  (is-eq tx-sender CONTRACT_OWNER)
)

(define-private (current-time)
  (unwrap-panic (get-block-info? time (- block-height u1)))
)

(define-private (is-valid-task-id (task-id uint))
  (< task-id (var-get task-count))
)

(define-private (is-valid-details (details (string-utf8 256)))
  (> (len details) u0)
)

;; Public functions

;; Create a new task
(define-public (initiate-task (details (string-utf8 256)) (compensation uint))
  (let
    (
      (task-id (var-get task-count))
      (current-time-value (current-time))
    )
    (asserts! (is-valid-details details) ERR_INVALID_DETAILS)
    (asserts! (> compensation u0) ERR_INVALID_AMOUNT)
    (asserts! (>= (stx-get-balance tx-sender) compensation) ERR_INSUFFICIENT_BALANCE)
    
    (try! (stx-transfer? compensation tx-sender (as-contract tx-sender)))
    
    (map-set tasks
      { task-id: task-id }
      {
        initiator: tx-sender,
        details: details,
        compensation: compensation,
        is-open: true,
        solver: none,
        created-at: current-time-value,
        completed-at: none
      }
    )
    
    (var-set task-count (+ task-id u1))
    (ok task-id)
  )
)

;; Submit a solution and claim the task reward
(define-public (complete-task (task-id uint))
  (let
    (
      (task (unwrap! (map-get? tasks { task-id: task-id }) ERR_TASK_NOT_FOUND))
      (current-time-value (current-time))
    )
    (asserts! (is-valid-task-id task-id) ERR_INVALID_TASK_ID)
    (asserts! (get is-open task) ERR_TASK_NOT_OPEN)
    (asserts! (is-none (get solver task)) ERR_TASK_ALREADY_COMPLETED)
    (asserts! (not (is-eq tx-sender (get initiator task))) ERR_CANNOT_COMPLETE_OWN_TASK)
    
    (try! (as-contract (stx-transfer? (get compensation task) tx-sender tx-sender)))
    
    (map-set tasks
      { task-id: task-id }
      (merge task {
        is-open: false,
        solver: (some tx-sender),
        completed-at: (some current-time-value)
      })
    )
    
    (ok true)
  )
)

;; Cancel a task (only the initiator can cancel)
(define-public (cancel-task (task-id uint))
  (let
    (
      (task (unwrap! (map-get? tasks { task-id: task-id }) ERR_TASK_NOT_FOUND))
    )
    (asserts! (is-valid-task-id task-id) ERR_INVALID_TASK_ID)
    (asserts! (is-eq tx-sender (get initiator task)) ERR_UNAUTHORIZED)
    (asserts! (get is-open task) ERR_TASK_NOT_OPEN)
    (asserts! (is-none (get solver task)) ERR_TASK_ALREADY_COMPLETED)
    
    (try! (as-contract (stx-transfer? (get compensation task) tx-sender (get initiator task))))
    
    (map-set tasks
      { task-id: task-id }
      (merge task {
        is-open: false
      })
    )
    
    (ok true)
  )
)

;; Read-only functions

;; Get task details
(define-read-only (get-task-details (task-id uint))
  (map-get? tasks { task-id: task-id })
)

;; Get the total number of tasks
(define-read-only (get-total-tasks)
  (var-get task-count)
)

;; Get open tasks
(define-read-only (get-open-tasks (limit uint))
  (let
    (
      (total-tasks (var-get task-count))
      (actual-limit (min limit total-tasks))
    )
    (filter is-open-task 
      (map get-task-details 
        (list-to-limit actual-limit)
      )
    )
  )
)

(define-private (is-open-task (task (optional {
    initiator: principal,
    details: (string-utf8 256),
    compensation: uint,
    is-open: bool,
    solver: (optional principal),
    created-at: uint,
    completed-at: (optional uint)
  })))
  (match task
    task-data (get is-open task-data)
    false
  )
)

(define-private (list-to-limit (n uint))
  (list
    u0 u1 u2 u3 u4 u5 u6 u7 u8 u9 u10 u11 u12 u13 u14 u15
    u16 u17 u18 u19 u20 u21 u22 u23 u24 u25 u26 u27 u28 u29 u30 u31
  )
)

(define-private (min (a uint) (b uint))
  (if (<= a b) a b)
)