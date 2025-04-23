// app.js

document.addEventListener("alpine:init", () => {
  // Data Produk
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Bubuk Kopi Sirezeki", img: "1.png", detail:"Kopi dengan cita rasa kuat dan aroma khas yang bikin suasana makin hangat. Cocok buat kamu yang suka kopi bold dan berkarakter.", price: 20000 },
      { id: 2, name: "Bubuk Kopi Giras Cap Putri Cempo", img: "2.png", detail:"Rasa klasik yang tak lekang oleh waktu. Racikan khas yang selalu jadi favorit, pas untuk dinikmati kapan pun.", price: 25000 },
      { id: 3, name: "Bubuk Kopi Deplok Murni Affree", img: "3.png", detail:"Kopi murni dengan rasa otentik, tanpa campuran, menghadirkan kenikmatan alami dari biji kopi pilihan.", price: 40000 },
      { id: 4, name: "Bubuk Kopi Robusta Gresik", img: "4.png", detail:"Andalan para pecinta kopi robusta sejati. Punya karakter rasa kuat, pahit mantap, dan aftertaste yang nempel di lidah.", price: 30000 },
      { id: 5, name: "Bubuk Kopi Arab Imtaq", img: "5.png", detail:"Buat yang suka sensasi lembut dengan aroma khas arabica, produk ini pilihan tepat. Rasanya ringan, tapi tetap kaya rasa.", price: 35000 },
      { id: 6, name: "Bubuk Kopi Gendhos", img: "6.png", detail:"Racikan kopi unik khas Dikin Coffee Gresik. Cocok buat yang suka kopi dengan rasa khas, beda dari yang lain.", price: 35000 },
    ],
  }));

  // Store Cart
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) return item;
          item.quantity++;
          item.total = item.price * item.quantity;
          this.quantity++;
          this.total += item.price;
          return item;
        });
      }
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) return item;
          item.quantity--;
          item.total = item.price * item.quantity;
          this.quantity--;
          this.total -= item.price;
          return item;
        });
      } else {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });

  // Store Product Detail Modal
  Alpine.store("product", {
    detail: null,

    openModal(item) {
      this.detail = item;
      document.getElementById("item-detail-modal").style.display = "flex";
    },

    closeModal() {
      document.getElementById("item-detail-modal").style.display = "none";
    },
  });
});

// Konversi ke format Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
