"use client"

import { useState } from "react"
import { storage, db } from "../../../../services/firebase-config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useFormik } from "formik"
import * as Yup from "yup"

const AdminEditor: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageTouched, setImageTouched] = useState(false)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      date: Yup.string().required("Date is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setImageTouched(true)

      if (!imageFile) {
        return
      }

      setLoading(true)

      try {
        const imageRef = ref(storage, `uploads/${Date.now()}-${imageFile.name}`)
        await uploadBytes(imageRef, imageFile)
        const imageUrl = await getDownloadURL(imageRef)

        await addDoc(collection(db, "updates"), {
          ...values,
          imageUrl,
          createdAt: Timestamp.now(),
        })

        resetForm()
        setImageFile(null)
        setImageTouched(false)
        alert("Uploaded successfully")
      } catch (error) {
        console.error("Upload failed:", error)
        alert("Failed to upload")
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload A New Update</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}

        <input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-red-500 text-sm">{formik.errors.date}</p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}

        {/* Custom File Input */}
        <div className="w-full">
          <label
            htmlFor="fileInput"
            className="inline-block px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition"
          >
            {imageFile ? "Change Image" : "Choose Image"}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            onBlur={() => setImageTouched(true)}
            className="hidden"
          />
          <p className="mt-1 text-sm text-gray-600">
            {imageFile ? imageFile.name : "No file chosen"}
          </p>
          {imageTouched && !imageFile && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-stone-800 transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  )
}

export default AdminEditor
