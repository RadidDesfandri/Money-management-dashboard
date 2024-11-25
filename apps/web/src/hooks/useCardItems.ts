import { ImLeaf } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";
import { LuArrowUpNarrowWide } from "react-icons/lu";
import { FaHandHoldingDollar } from "react-icons/fa6";

export const useBenefit = () => {
  const benefit = [
    {
      icon: FaMoneyBillWave,
      tittle: "Mengelola Anggaran Lebih Mudah",
      description:
        "Dengan fitur anggaran otomatis, Anda dapat memantau pengeluaran dan pendapatan secara real-time.",
    },
    {
      icon: LuArrowUpNarrowWide,
      tittle: "Capai Tujuan Keuangan Anda",
      description:
        "Tentukan tujuan keuangan seperti membeli rumah, menabung untuk liburan, atau dana darurat, dan pantau kemajuan  secara teratur.",
    },
    {
      icon: FaHandHoldingDollar,
      tittle: "Rencana Investasi yang Terpersonalisasi",
      description:
        "Dengan analisis data keuangan Anda, platform ini membantu Anda membuat keputusan investasi yang lebih cerdas.",
    },
    {
      icon: ImLeaf,
      tittle: "Laporan Keuangan yang Transparan",
      description:
        "Dapatkan laporan keuangan yang komprehensif untuk memantau arus kas, pengeluaran, dan tabungan Anda.",
    },
  ];

  return benefit;
};

export const useTestimonial = () => {
  const testimoni = [
    {
      name: "Joko, Karyawan",
      rating: 5,
      image: "/person/profileplaceholder.png",
      testi:
        "Saya selalu merasa kesulitan mengatur anggaran, tapi dengan aplikasi ini, saya bisa melihat dengan jelas pengeluaran saya. Pengelolaan keuangan jadi lebih mudah dan tidak membingungkan.",
    },
    {
      name: "Tomi, Mahasiswa",
      rating: 4,
      image: "/person/avatar.jpg",
      testi:
        "Sebelum menggunakan aplikasi ini, saya tidak tahu di mana uang saya hilang setiap bulan. Sekarang saya bisa melihat dan mengontrol setiap pengeluaran dengan lebih baik.",
    },
    {
      name: "Yuli, Guru",
      rating: 5,
      image: "/person/testi2.jpg",
      testi:
        "Saya tidak pernah merasa begitu mudah merencanakan masa depan finansial saya. Dengan aplikasi ini, saya bisa mencapai tujuan tabungan saya lebih cepat dan lebih teratur.",
    },
    {
      name: "Lina, Karyawan Perusahaan",
      rating: 4,
      image: "/person/testi3.jpg",
      testi:
        "Terima kasih kepada platform ini, saya sekarang memiliki rencana keuangan yang lebih jelas dan terorganisir. Kini saya bisa menghemat lebih banyak tanpa stres.",
    },
    {
      name: "Rahmat, Pengusaha",
      rating: 4,
      image: "/person/profile.jpg",
      testi:
        "Aplikasi ini membantu saya menghemat lebih banyak setiap bulan. Dengan pemisahan dana otomatis  yang selalu tepat waktu, saya bisa lebih fokus mencapai tujuan keuangan saya.",
    },
  ];

  return testimoni;
};
