import { useState, useEffect } from "react";
import {
  fetchPendingLoans,
  acceptLoan,
  rejectLoan,
} from "../services/loanService";

export const useLoanRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les demandes en attente
  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchPendingLoans();
      console.log("results", results);
      setRequests(results);
    } catch (error) {
      setError("Failed to fetch requests. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Accepter une demande
  const acceptLoanRequest = async (loanId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedLoan = await acceptLoan(loanId);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === loanId ? updatedLoan : request
        )
      );
    } catch (error) {
      setError("Failed to accept the request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Refuser une demande
  const rejectLoanRequest = async (loanId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedLoan = await rejectLoan(loanId);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === loanId ? updatedLoan : request
        )
      );
    } catch (error) {
      setError("Failed to reject the request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les demandes au montage du composant
  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    isLoading,
    error,
    acceptLoanRequest,
    rejectLoanRequest,
  };
};