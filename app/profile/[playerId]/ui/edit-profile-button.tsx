"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProfileButton({ playerId }: { playerId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        router.push(`/profile/${playerId}/edit`);
    };

    return (
        <button type="button" className="btn btn-primary" onClick={handleClick} disabled={loading}>
            {loading ? (
                <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span className="visually-hidden" role="status">Loading...</span>
                </>
            ) : (
                "Edit"
            )}
        </button>
    );
}