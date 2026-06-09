import React from 'react';
import FaqItem from '../molecules/FaqItem';

const FaqSection = () => {
  const faqs = [
    {
      question: "Apakah aplikasi ini gratis untuk pencari kos?",
      answer: "Ya! KosSearch 100% gratis digunakan oleh siapapun yang sedang mencari kos. Anda bisa mencari, menggunakan AI, dan menghubungi pemilik kos tanpa dipungut biaya platform."
    },
    {
      question: "Bagaimana cara mengetahui kos masih kosong?",
      answer: "Setiap pemilik kos selalu memperbarui ketersediaan kamar. Di halaman detail, perhatikan badge \"Tersedia\" dan sisa jumlah kamar. Jika ragu, Anda bisa klik tombol \"Tanya Pemilik\"."
    },
    {
      question: "Apakah saya bisa survei kos secara langsung?",
      answer: "Sangat bisa! Kami merekomendasikan Anda untuk survei. Cukup hubungi pemilik kos melalui tombol \"Tanya Pemilik\" untuk mengatur jadwal survei sebelum Anda melakukan pembayaran."
    },
    {
      question: "Bagaimana jika saya ingin mendaftarkan kos saya?",
      answer: "Anda cukup mendaftar sebagai Pengguna. Lalu di halaman Profil, Anda dapat mengajukan diri menjadi \"Pemilik Kos\" (Owner). Setelah disetujui, Anda akan mendapatkan akses ke Dashboard Owner."
    },
    {
      question: "Apakah pembayaran dilakukan melalui aplikasi KosSearch?",
      answer: "Saat ini, sistem kami berfungsi sebagai penghubung antara Anda dan pemilik kos. Transaksi pembayaran sewa akan Anda lakukan langsung dengan pemilik kos bersangkutan setelah kesepakatan terjadi."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-outline-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">Pertanyaan Seputar KosSearch</h2>
          <p className="text-lg text-ink-light">Jawaban cepat untuk pertanyaan yang sering diajukan pengguna.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FaqItem 
              key={idx}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
