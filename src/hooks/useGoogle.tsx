import { useCallback, useEffect, useState } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { useAuth } from "./useAuth";
import { GoogleUser } from "../types/User";

type Params = {
  onSuccess: () => void;
  onError: (err: string | object) => void;
};

function useGoogle({ onSuccess, onError }: Params) {
  const { setUser, setLoading } = useAuth();

  const [googleResponse, setGoogleResponse] = useState<TokenResponse | null>(null);

  useEffect(() => {
    if (googleResponse) {
      setLoading(true);
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${googleResponse.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setLoading(false);
          const data: GoogleUser = res.data;
          if (data) {
            setUser({
              email: data.email,
              name: data.name,
              picture: data.picture
            });
            onSuccess();
          } else {
            onError('Google: no data');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err)
          onError(err);
        });
    }
  }, [googleResponse, setLoading, setUser, onSuccess, onError]);

  const handleSuccess = useCallback((codeResponse: TokenResponse) => {
    console.log({codeResponse})
    setGoogleResponse(codeResponse);
  }, [setGoogleResponse]);

  const handleError = (error: Pick<TokenResponse, 'error' | 'error_description' | 'error_uri'>) => {
    setLoading(false);
    console.log({error})
    onError(error);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return {
    googleLogin,
  }
}

export default useGoogle;
