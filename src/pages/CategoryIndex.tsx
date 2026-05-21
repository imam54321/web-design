import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { API_URL } from "../services/api";

type Category = {
  id: number;
  name: string;
};

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = () => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA CATEGORY:", data);

        setCategories(Array.isArray(data) ? data : data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil category:", error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
    const handleDelete = async (id: number) => {
      const confirmDelete = confirm("Yakin ingin menghapus category ini?");

      if (!confirmDelete) return;

      try {
        const response = await fetch(`${API_URL}/categories/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus category");
        }

        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        alert("Category berhasil dihapus");
      } catch (error) {
        console.error("DELETE CATEGORY ERROR:", error);
        alert("Category gagal dihapus");
      }
    };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Category</h1>
      <h2 className="text-gray-600 mb-6">Inilah Category Invofest</h2>

      <Link
        to="/dashboard/category/create"
        className="inline-block mb-6 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        + Tambah Category
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border-2 border-red-600 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-red-600">{cat.name}</h3>
            <p className="text-sm font-semibold text-red-600 pb-5">
              ID CATEGORY = {cat.id}
            </p>
         <div className="flex justify-center gap-3">
              <Link to={`/dashboard/category/edit/${cat.id}`}>
                <Button title="Edit" variant="outline" type="button" />
              </Link>

              <Button
                title="Delete"
                variant="primary"
                type="button"
                onClick={() => handleDelete(cat.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
