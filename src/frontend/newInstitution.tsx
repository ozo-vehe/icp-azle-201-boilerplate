import "./newInstitution.scss";
import { useState } from "react";
import { backend } from "../declarations/backend";
import { useNavigate } from "react-router-dom";

function NewInstitution() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword ] = useState("");
  const [cpassword, setSpassword] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(Uint8Array.of());
  const [duration, setDuration] = useState(120);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const newInstitution = async () => {
    setSaving(true);
    try {
      let newInstitution = {
        title,
        description,
        image,
        email,
        password
      };

      console.log(newInstitution);
      await backend.newInstitution(newInstitution);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const changeFile = async (file: File | undefined) => {
    let data = Uint8Array.of();
    if (file != null) {
      const stream = await file.stream();
      const reader = stream.getReader();
      while (true) {
        const part = await reader.read();
        const chunk = part.value;
        if (chunk == null) {
          break;
        }
        data = concatUint8Arrays(data, chunk);
      }
    }
    setImage(data);
  };

  // TODO: Faster way of concatenation
  const concatUint8Arrays = (
    left: Uint8Array,
    right: Uint8Array
  ): Uint8Array => {
    let temporary: number[] = [];
    for (let element of left) {
      temporary.push(element);
    }
    for (let element of right) {
      temporary.push(element);
    }
    return Uint8Array.from(temporary);
  };

  return (
    <>
      <h4 className="h">
        Request Accreditation of your Institution. Once you are approved, <br />
        you will be able to record Portfolios
      </h4>
      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            Institution / <br /> Company name:{" "}
          </div>
          <div className="form-input">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Email:
          </div>
          <div className="form-input">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">
            full Description
            
          </div>
          <div className="form-input">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {/* password box */}

        <div className="form-row">
          <div className="form-label">
            Password:
          </div>
          <div className="form-input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {/* cpassword */}

        <div className="form-row">
          <div className="form-label">
            Confirm Password:
          </div>
          <div className="form-input">
            <input
              type="password"
              value={cpassword}
              onChange={(e) => setSpassword(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Logo of your <br /> Institution (PNG only):{" "}
          </div>
          <div className="form-input">
            <input
              type="file"
              accept=".png"
              onChange={(e) => changeFile(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="form-footer">
          <button
            className="form-button"
            onClick={newInstitution}
            disabled={saving}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default NewInstitution;
