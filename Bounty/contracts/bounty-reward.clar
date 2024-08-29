;; Bounty or Task Reward Smart Contract

;; Define data variables
(define-data-var task-count uint u0)
(define-map tasks
  { task-id: uint }
  {
    initiator: principal,
    details: (string-utf8 256),
    compensation: uint,
    is-open: bool,
    solver: (optional principal)
  }
)

;; Define public functions

;; Create a new task
(define-public (initiate-task (details (string-utf8 256)) (compensation uint))
  (let
    (
      (task-id (var-get task-count))
    )
    (asserts! (> compensation u0) (err u"Compensation must be greater than zero"))
    (asserts! (>= (stx-get-balance tx-sender) compensation) (err u"Insufficient balance"))
    
    (try! (stx-transfer? compensation tx-sender (as-contract tx-sender)))
    
    (map-set tasks
      { task-id: task-id }
      {
        initiator: tx-sender,
        details: details,
        compensation: compensation,
        is-open: true,
        solver: none
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
      (task (unwrap! (map-get? tasks { task-id: task-id }) (err u"Task not found")))
    )
    (asserts! (get is-open task) (err u"Task is not open"))
    (asserts! (is-none (get solver task)) (err u"Task has already been completed"))
    
    (try! (as-contract (stx-transfer? (get compensation task) tx-sender tx-sender)))
    
    (map-set tasks
      { task-id: task-id }
      (merge task {
        is-open: false,
        solver: (some tx-sender)
      })
    )
    
    (ok true)
  )
)

;; Read-only function to get task details
(define-read-only (get-task-details (task-id uint))
  (map-get? tasks { task-id: task-id })
)

;; Read-only function to get the total number of tasks
(define-read-only (get-total-tasks)
  (var-get task-count)
)