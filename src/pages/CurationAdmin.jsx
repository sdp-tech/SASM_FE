import React from "react";
import { useParams } from "react-router-dom";
import CurationFormPage from "../components/Admin/CurationFormPage";

export default function CurationAdmin() {
    const params = useParams();

    return (
        <div>
            {params.id ? <CurationFormPage id={params.id} /> : <CurationFormPage />}
        </div>
    );
}