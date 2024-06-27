import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

type userRegistrationResponse = {
  message: string;
};
type Signinresponse = {
  message: any;
  success: any;
  user: {
    _id: any;
    name: any;
    email: any;
  };
  accessToken: any;
};
type RegistrationData = {};
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<userRegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "auth/register/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log("error===>", error);
        }
      },
    }),

    signin: builder.mutation<Signinresponse, RegistrationData>({
      query: (data) => ({
        url: "auth/login/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accesstoken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getAllUser: builder.query({
      query: () => ({
        url: "auth/allUser/",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegisterMutation, useGetAllUserQuery, useSigninMutation } =
  authApi;
