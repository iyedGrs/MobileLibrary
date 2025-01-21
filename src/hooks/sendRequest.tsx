import { useState } from "react"
import { loanBook } from "../services/loanService"

export const useSendRequest = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fonction pour envoyer une demande de prêt
  const sendLoanRequest = async (loanDetails: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const { userId, bookId } = loanDetails
      const newLoan = await loanBook(userId, bookId) // Envoie la demande de prêt au backend
      return newLoan // Retourne la nouvelle demande si elle est créée avec succès
    } catch (error) {
      setError("Failed to create loan request. Please try again.")
      throw error // Lancer l'erreur pour pouvoir la gérer ailleurs si nécessaire
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendLoanRequest,
    isLoading,
    error,
  }
}
