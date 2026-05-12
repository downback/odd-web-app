"use client"

import { useState } from "react"
import { getSupabaseClient } from "../../../../services/supabase-client"
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
        const supabase = getSupabaseClient()
        const sanitizedFileName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "-")
        const imagePath = `${Date.now()}-${sanitizedFileName}`
        const { error: uploadError } = await supabase.storage
          .from("updates")
          .upload(imagePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from("updates")
          .getPublicUrl(imagePath)

        const { error: insertError } = await supabase.from("updates").insert({
          title: values.title,
          date: values.date,
          description: values.description,
          image_url: publicUrlData.publicUrl,
          image_path: imagePath,
          created_at: new Date().toISOString(),
        })

        if (insertError) {
          await supabase.storage.from("updates").remove([imagePath])
          throw insertError
        }

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
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
          Create
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">
          New update
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Workshop, launch, field note..."
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white focus:ring-4 focus:ring-stone-200"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-stone-950 focus:bg-white focus:ring-4 focus:ring-stone-200"
          />
          {formik.touched.date && formik.errors.date && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.date}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a concise public-facing summary."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="min-h-32 w-full resize-y rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm leading-6 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white focus:ring-4 focus:ring-stone-200"
            rows={5}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.description}
            </p>
          )}
        </div>

        <div className="rounded-md border border-dashed border-stone-300 bg-stone-50 p-4">
          <p className="mb-3 text-sm font-semibold text-stone-700">Image</p>
          <label
            htmlFor="fileInput"
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
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
          <p className="mt-3 truncate text-sm text-stone-500">
            {imageFile ? imageFile.name : "No file chosen"}
          </p>
          {imageTouched && !imageFile && (
            <p className="mt-2 text-sm text-red-600">Image is required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </section>
  )
}

export default AdminEditor
