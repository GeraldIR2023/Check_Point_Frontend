"use client";

import { uploadImageAction } from "@/actions/upload-image-action";
import { getImagePath } from "@/src/utils/utils";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function UploadProductImage({
    currentImage,
    onImageUpload,
}: {
    currentImage?: string;
    onImageUpload: (url: string) => void;
}) {
    const [previewImage, setPreviewImage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(
        async (files: File[]) => {
            const formData = new FormData();
            files.forEach((file) => formData.append("file", file));

            try {
                setIsUploading(true);
                const imageUrl = await uploadImageAction(formData);
                setPreviewImage(imageUrl);
                onImageUpload(imageUrl);
                toast.success("Image uploaded successfully");
            } catch (error) {
                toast.error("Failed to upload image");
            } finally {
                setIsUploading(false);
            }
        },
        [onImageUpload],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
        onDrop,
        maxFiles: 1,
    });

    return (
        <div className="space-y-4">
            <label className="block text-xs font-black uppercase text-zinc-500 tracking-widest">
                Product Image
            </label>

            <div
                {...getRootProps()}
                className={`
                    relative py-12 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer
                    ${
                        isDragActive
                            ? "border-[#F47321] bg-orange-50 text-[#F47321]"
                            : "border-zinc-200 text-zinc-400 bg-zinc-50 hover:border-zinc-300"
                    }
                    ${isUploading ? "opacity-50 pointer-events-none" : ""}
                `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                    {isUploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F47321]" />
                    ) : (
                        <CloudArrowUpIcon className="w-10 h-10 mb-2" />
                    )}
                    <p className="text-sm font-bold">
                        {isDragActive
                            ? "Drop it here!"
                            : "Drag & drop or click to upload"}
                    </p>
                    <p className="text-[10px] uppercase font-black opacity-60">
                        PNG, JPG up to 5MB
                    </p>
                </div>
            </div>

            {(previewImage || currentImage) && (
                <div className="grid grid-cols-1 gap-4">
                    <p className="text-xs font-black uppercase text-zinc-500">
                        Preview
                    </p>
                    <div className="w-40 h-52 relative rounded-xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100">
                        <Image
                            src={previewImage || getImagePath(currentImage!)}
                            alt="Product preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
