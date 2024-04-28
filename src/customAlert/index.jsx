import { Alert } from "react-native";

export const fieldError = () => {
  
  Alert.alert(
    "Error",
    "Email dan password harus diisi.",
    [
      {
        text: "OK",
      },
    ]
  );
}
export const nameError = () => {
  Alert.alert(
    "Error",
    "Nama harus diisi.",
    [
      {
        text: "OK",
      },
    ]
  );
}
export const minimumPasswordError = () => {
  Alert.alert(
    "Error",
    "Password harus memiliki minimal 6 karakter.",
    [
      {
        text: "OK",
      },
    ]
  );
}
export const  alertRegSuccessful = () => {
  Alert.alert(
    "Registrasi Berhasil",
    "Email Anda telah dibuat. Silakan login kembali.",
    [
      {
        text: "OK",
      },
    ]
  );
}
export const  alertEmailDuplicate = () => {
  Alert.alert(
    "Error",
    "Email Duplikat, Silahkan masukan Email yang berbeda",
    [
      {
        text: "OK",
      },
    ]
  );
}


export const invalidEmailError = () => {
  Alert.alert(
    "Error",
    "Format email tidak valid. Silakan masukkan email yang benar.",
    [
      {
        text: "OK",
      },
    ]
  );
};

export const loginError = () => {
  Alert.alert(
    "Error",
    "Email dan password yang Anda masukkan salah atau belum terdaftar. Silahkan periksa kembali.",
    [
      {
        text: "OK",
      },
    ]
  );
}
export const alertInvalidCredential = () => {
  Alert.alert(
    "Error",
    "Email dan password yang anda masukkan salah atau belum terdaftar, Silahkan periksa kembali email yang anda masukkan",
    [
      {
        text: "OK",
      },
    ]
  );
}