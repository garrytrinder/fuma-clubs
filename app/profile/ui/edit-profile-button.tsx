"use client";

import { useRouter } from "next/navigation";

export default function EditProfileButton() {

    const router = useRouter();

    return (
        <button type="button" className="btn btn-primary" onClick={() => router.push("/profile/edit")}>Edit</button>
    );
}