import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Dokter = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <Text>
          Penamaan yang Tidak Tepat: Periksa apakah Anda telah menuliskan nama
          modul dengan benar di file Conten.jsx. Pastikan tidak ada kesalahan
          penulisan atau typo. Direktori yang Salah: Pastikan modul tersebut
          dapat diakses dari direktori tempat Anda mengimpornya. Jika modul
          tersebut berada di direktori yang berbeda, pastikan Anda telah
          menyesuaikan path impor dengan benar. Cache yang Rusak: Terkadang
          cache dari dependensi Anda dapat menjadi rusak. Anda dapat mencoba
          menghapus direktori node_modules dan file package-lock.json (atau
          yarn.lock) dan kemudian menjalankan perintah instalasi dependensi
          kembali (npm install atau yarn). Masalah Konfigurasi Dependency:
          Pastikan konfigurasi dependensi Anda sudah benar. Periksa apakah Anda
          sudah menggunakan versi yang kompatibel dari
          @react-navigation/material-top-tabs dengan versi lain dari
          @react-navigation yang Anda gunakan. Periksa setiap kemungkinan
          penyebab di atas dan perbaiki sesuai kebutuhan. Jika Anda masih
          mengalami kesulitan, pastikan untuk memeriksa dokumentasi modul yang
          digunakan dan cari panduan yang lebih spesifik atau coba mencari
          solusi dari komunitas pengembang React Native.Penamaan yang Tidak
          Tepat: Periksa apakah Anda telah menuliskan nama modul dengan benar di
          file Conten.jsx. Pastikan tidak ada kesalahan penulisan atau typo.
          Direktori yang Salah: Pastikan modul tersebut dapat diakses dari
          direktori tempat Anda mengimpornya. Jika modul tersebut berada di
          direktori yang berbeda, pastikan Anda telah menyesuaikan path impor
          dengan benar. Cache yang Rusak: Terkadang cache dari dependensi Anda
          dapat menjadi rusak. Anda dapat mencoba menghapus direktori
          node_modules dan file package-lock.json (atau yarn.lock) dan kemudian
          menjalankan perintah instalasi dependensi kembali (npm install atau
          yarn). Masalah Konfigurasi Dependency: Pastikan konfigurasi dependensi
          Anda sudah benar. Periksa apakah Anda sudah menggunakan versi yang
          kompatibel dari @react-navigation/material-top-tabs dengan versi lain
          dari @react-navigation yang Anda gunakan. Periksa setiap kemungkinan
          penyebab di atas dan perbaiki sesuai kebutuhan. Jika Anda masih
          mengalami kesulitan, pastikan untuk memeriksa dokumentasi modul yang
          digunakan dan cari panduan yang lebih spesifik atau coba mencari
          solusi dari komunitas pengembang React Native.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Dokter;

const styles = StyleSheet.create({});
