console.log("video72");
const fetchBlogs = async () => {
    const res = await fetch("http://localhost:8000/blogs");
    const data = await res.json();
    console.log(data);
    //insert data to html
    const tbody = document.querySelector("tbody");
    if (data && data.length) {
        data.forEach((blog, index) => {
            tbody.innerHTML += `
            <tr>
            <td>${blog.id}</td>
            <td>${blog.title}</td>
            <td>${blog.author}</td>
            <td>${blog.content}</td>
            <td><button>xoa</button></td>
            </tr>
            `;
        });
    }
};

// add new row to end
const addNewRowToEnd = (blog) => {
    const tableBody =
        document.querySelector("#blogs tbody");

    // Tạo phần tử dòng mới
    const newRow = document.createElement("tr");

    // Gán HTML cho dòng
    newRow.innerHTML = `
    <tr>
            <td>${blog.id}</td>
            <td>${blog.title}</td>
            <td>${blog.author}</td>
            <td>${blog.content}</td>
            <td><button>xoa</button></td>
            </tr>
  `;

    // Thêm dòng vào cuối bảng
    tableBody.appendChild(newRow);
};

const handleAddBlog = () => {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const content = document.querySelector("#content");
    const saveBlogBtn = document.querySelector("#saveBlog");

    saveBlogBtn.addEventListener("click", async (event) => {
        if (event) {
            event.preventDefault();
        }
        //call api to create a new blog
        const rawResponse = await fetch(
            "http://localhost:8000/blogs", // Sửa endpoint từ posts thành blogs để khớp với lúc lấy dữ liệu
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.value,
                    author: author.value,
                    content: content.value,
                }),
            }
        );
        const data = await rawResponse.json();
        addNewRowToEnd(data);
        console.log("phan hoi api", data);
    });
};

fetchBlogs();
handleAddBlog();
