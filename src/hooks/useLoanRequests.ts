import { useState, useCallback } from "react"
import { fetchPendingLoans, acceptLoan, rejectLoan } from "../services/loanService"

export const useLoanRequests = () => {
  const [requests, setRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRequests = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const results = await fetchPendingLoans()
      console.log("Fetched requests:", results)
      setRequests(results)
    } catch (error) {
      console.error("Error fetching requests:", error)
      setError("Failed to fetch requests. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const acceptLoanRequest = useCallback(async (loanId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedLoan = await acceptLoan(loanId)
      console.log("Accepted loan:", updatedLoan)
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== loanId))
    } catch (error) {
      console.error("Error accepting loan:", error)
      setError("Failed to accept the request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const rejectLoanRequest = useCallback(async (loanId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedLoan = await rejectLoan(loanId)
      console.log("Rejected loan:", updatedLoan)
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== loanId))
    } catch (error) {
      console.error("Error rejecting loan:", error)
      setError("Failed to reject the request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    requests,
    isLoading,
    error,
    fetchRequests,
    acceptLoanRequest,
    rejectLoanRequest,
  }
}

