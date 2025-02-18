"use client"

import { useFormStatus } from "react-dom";

export default function SaveProfileButton({ disabled }: { disabled: boolean }) {

    const { pending } = useFormStatus();

    return (
        <button type="submit" className="btn btn-primary" disabled={!disabled || pending}>
            {!pending ?
                "Save" :
                <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span className="visually-hidden" role="status">Loading...</span>
                </>
            }
        </button>
    );
}