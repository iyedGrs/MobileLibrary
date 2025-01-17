// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import Svg, { Rect, Path } from "react-native-svg";
// import tailwind from "tailwind-rn";

// const login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <View
//       style={tailwind("flex-1 justify-center items-center bg-gray-100 p-6")}
//     >
//       <Svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="64"
//         height="64"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-library-big w-16 h-16 text-blue-600"
//       >
//         <Rect width="8" height="18" x="3" y="3" rx="1" />
//         <Path d="M7 3v18" />
//         <Path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
//       </Svg>

//       <Text style={tailwind("text-2xl font-bold text-center text-black mt-4")}>
//         Welcome to BiblioTech
//       </Text>

//       <TextInput
//         style={tailwind(
//           "w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mt-6"
//         )}
//         placeholder="Username"
//         value={username}
//         onChangeText={(text) => setUsername(text)}
//       />

//       <TextInput
//         style={tailwind(
//           "w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mt-4"
//         )}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />

//       <View
//         style={tailwind(
//           "w-full mt-6 bg-blue border border-blue-500 rounded-lg px-4 py-2 flex items-center justify-center"
//         )}
//       >
//         <Button title="Login" />
//       </View>

//       <View style={tailwind("w-full mt-4")}>
//         <Button title="Register" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// //svg
// {
//   /* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-library-big w-16 h-16 text-blue-600"><rect width="8" height="18" x="3" y="3" rx="1"></rect><path d="M7 3v18"></path><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"></path></svg> */
// }
// export default login;
