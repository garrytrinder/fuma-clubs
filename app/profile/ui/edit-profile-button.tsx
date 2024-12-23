"use client"

import { useFormStatus } from "react-dom";

export default function EditProfileButton() {

    const { pending } = useFormStatus();

    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {!pending ?
                "Edit" :
                <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span className="visually-hidden" role="status">Loading...</span>
                </>
            }
        </button>
    );
}