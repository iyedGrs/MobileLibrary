import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLoanRequests } from "@/src/hooks/useLoanRequests";

const UserRequests = () => {
  const { requests, isLoading, error, acceptLoanRequest, rejectLoanRequest } =
    useLoanRequests();

  console.log("this is the request", requests);

  if (isLoading) return <Text className="text-center mt-4">Loading...</Text>;
  if (error)
    return (
      <Text className="text-center mt-4 text-red-500">Error: {error}</Text>
    );

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {/* Titre */}
      <Text className="text-2xl font-bold text-center mb-6">
        User Loan Requests
      </Text>

      {/* Table-like structure */}
      <View className="border border-gray-300 rounded-lg bg-white">
        {/* Table Header */}
        <View className="flex-row justify-between bg-gray-200 p-3 rounded-t-lg">
          <Text className="flex-1 font-bold text-center">User ID</Text>
          <Text className="flex-1 font-bold text-center">Book ID</Text>
          <Text className="flex-1 font-bold text-center">Request Date</Text>
          <Text className="flex-1 font-bold text-center">Status</Text>
          <Text className="flex-1 font-bold text-center">Actions</Text>
        </View>

        {/* Table Rows */}
        {requests.map((request) => (
          <View
            key={request.id}
            className="flex-row justify-between p-3 border-b border-gray-200"
          >
            <Text className="flex-1 text-center">{request.user_id}</Text>
            <Text className="flex-1 text-center">{request.book_id}</Text>
            <Text className="flex-1 text-center">{request.loan_date}</Text>
            <Text className="flex-1 text-center">{request.status}</Text>
            <View className="flex-1 flex-row justify-center space-x-2">
              {request.status === "pending" && (
                <>
                  <TouchableOpacity
                    className="bg-green-500 px-3 py-1 rounded"
                    onPress={() => acceptLoanRequest(request.id)}
                  >
                    <Text className="text-white font-bold">Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 px-3 py-1 rounded"
                    onPress={() => rejectLoanRequest(request.id)}
                  >
                    <Text className="text-white font-bold">Reject</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserRequests;
