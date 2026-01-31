import { Upload } from "lucide-react"
import React from "react"

type ImageUploadProps = {
  preview: string | null
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ImageUpload({ preview, onImageChange }: ImageUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Image
      </label>
      <div className="flex items-center gap-4">
        {preview && (
          <img 
            src={preview} 
            alt="Preview" 
            className="w-20 h-20 object-cover rounded border"
          />
        )}
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
          <Upload size={18} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {preview ? "Change Image" : "Upload Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  )
}