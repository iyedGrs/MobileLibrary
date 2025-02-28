import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useLoanRequests } from "@/src/hooks/useLoanRequests";
import { Ionicons } from "@expo/vector-icons";

const UserRequests = () => {
  const { requests, isLoading, error, acceptLoanRequest, rejectLoanRequest } =
    useLoanRequests();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#0284c7" />
        <Text className="text-gray-600 mt-4">Loading requests...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Ionicons name="alert-circle" size={48} color="#ef4444" />
        <Text className="text-red-500 text-lg font-semibold mt-4">
          Error loading requests
        </Text>
        <Text className="text-gray-600 text-center mt-2">{error}</Text>
      </View>
    );
  }

  if (!requests?.length) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Ionicons name="documents-outline" size={48} color="#9ca3af" />
        <Text className="text-gray-600 text-lg font-semibold mt-4">
          No loan requests
        </Text>
        <Text className="text-gray-500 text-center mt-2">
          When users request to borrow books, they'll appear here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          User Loan Requests
        </Text>

        {requests.map((request) => (
          <View
            key={request.id}
            className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100"
          >
            <View className="p-4">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-sm text-gray-500 mb-1">User ID</Text>
                  <Text
                    className="text-gray-900 font-medium"
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {request.user_id.slice(0, 10)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-500 mb-1">Book ID</Text>
                  <Text
                    className="text-gray-900 font-medium"
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {request.book_id.slice(0, 10)}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm text-gray-500 mb-1">
                    Request Date
                  </Text>
                  <Text className="text-gray-900">{request.loan_date}</Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-500 mb-1">Status</Text>
                  <View
                    className={`rounded-full px-3 py-1 ${
                      request.approval ? "bg-green-100" : "bg-yellow-100"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        request.approval ? "text-green-700" : "text-yellow-700"
                      }`}
                    >
                      {request.approval ? "Approved" : "Pending"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {!request.approval && (
              <View className="flex-row border-t border-gray-100">
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center py-4 bg-gray-50 active:bg-gray-100"
                  onPress={() => acceptLoanRequest(request.id)}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="#16a34a"
                  />
                  <Text className="text-green-600 font-semibold ml-2">
                    Accept
                  </Text>
                </TouchableOpacity>

                <View className="w-px bg-gray-100" />

                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center py-4 bg-gray-50 active:bg-gray-100"
                  onPress={() => rejectLoanRequest(request.id)}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={20}
                    color="#dc2626"
                  />
                  <Text className="text-red-600 font-semibold ml-2">
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserRequests;
