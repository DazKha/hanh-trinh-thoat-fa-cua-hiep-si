# Hành trình thoát FA của Hiệp sĩ

Trong quá trình làm bài Wecode của cô thì em có ấn tượng với bài Kén rể, vì cách mô tả bài toán rất hay và cute. Vì thế, em tạo nên một trò chơi mô phỏng bài toán đó, với cốt truyện giống bài toán gốc: hiệp sĩ nghèo phải đi bộ đến cưới công chúa.  

> "Ai đến sớm nhất thì được cưới công chúa, không cần sính lễ."

---

## Ý tưởng

- Sử dụng thuật toán BFS để tìm đường ngắn nhất trong đồ thị không trọng số.
- Lưu lại `parent` của mỗi ô để truy ngược lại đường đi.
- Chuyển tọa độ người dùng (theo góc dưới-trái) thành chỉ số trong ma trận.
- Tự động co giãn `cell size` để hiển thị tối ưu theo kích thước màn hình.
- Tính toán hợp lệ và cảnh báo khi:
  - Nhập tọa độ sai.
  - Hiệp sĩ hoặc công chúa đứng trên ô bị cấm.

---

## Demo

Để chạy code, cô có thể xem demo trên GitHub Pages (https://ten-user.github.io/ten-repo/)

Hoặc chạy thủ công:

# Cách chạy (nếu tách thành 3 file)
1. Mở file index.html bằng trình duyệt.
2. Dán bản đồ và chọn vị trí.
3. Nhấn nút "Tìm đường".