export const typeLabels = {
  NEWS: "Tin tức hoạt động",
  NOTIFICATION: "Thông báo",
  KNOWLEDGE: "Kiến thức y khoa",
  INTRODUCE: "Giới thiệu",
  TRAINING: "Đào tạo",
  SERVICE: "Dịch vụ",
};

// Type → Đường dẫn chính
export const typeUrls = {
  NEWS: "/tin-tuc-hoat-dong",
  NOTIFICATION: "/thong-bao",
  KNOWLEDGE: "/kien-thuc-y-khoa",
  INTRODUCE: "/gioi-thieu",
  TRAINING: "/dao-tao",
  SERVICE: "/dich-vu",
};

// Path → Type
export const mapPathToType = Object.fromEntries(
  Object.entries(typeUrls).map(([type, path]) => [path, type])
);

// Submenu
export const typeSubmenus = {
  INTRODUCE: {
    name: "Giới thiệu",
    items: [
      { name: "Tổng quan bệnh viện", href: "/bai-viet/tong-quan-benh-vien" },
      { name: "Lịch sử hình thành", href: "/bai-viet/lich-su-hinh-thanh" },
      { name: "Sơ đồ tổ chức", href: "/bai-viet/so-do-to-chuc" },
      { name: "Ban lãnh đạo", href: "/bai-viet/ban-lanh-dao" },
    ],
  },
  TRAINING: {
    name: "Đào tạo",
    items: [
      { name: "Nghiên cứu khoa học", href: "/bai-viet/nghien-cuu-khoa-hoc" },
      { name: "Hợp tác quốc tế", href: "/bai-viet/hop-tac-quoc-te" },
      { name: "Đào tạo thực hành", href: "/bai-viet/dao-tao-thuc-hanh" },
    ],
  },
}
