import { useEffect, useRef, type FormEvent, useState } from "react";

// ─── WebGL animated grid background ───────────────────────────────────────────
function useShaderBackground(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl");
        if (!gl) return;

        const vertSrc = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragSrc = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      float grid(vec2 uv, float size) {
        vec2 g = fract(uv * size);
        vec2 line = step(0.98, g);
        return max(line.x, line.y);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec3 color = vec3(0.97, 0.98, 1.0);
        vec2 grid_uv = uv + vec2(u_time * 0.01, u_time * 0.01);
        float g1 = grid(grid_uv, 20.0) * 0.03;
        float g2 = grid(grid_uv, 5.0) * 0.01;
        color += g1 + g2;
        float vignette = length(uv - 0.5);
        color -= vignette * 0.05;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

        function compileShader(type: number, src: string) {
            const shader = gl!.createShader(type)!;
            gl!.shaderSource(shader, src);
            gl!.compileShader(shader);
            return shader;
        }

        const program = gl.createProgram()!;
        gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertSrc));
        gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragSrc));
        gl.linkProgram(program);
        gl.useProgram(program);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
        );

        const posLoc = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const timeLoc = gl.getUniformLocation(program, "u_time");
        const resLoc = gl.getUniformLocation(program, "u_resolution");

        let rafId: number;
        function render(t: number) {
            const time = t * 0.001;
            if (canvas!.width !== canvas!.clientWidth || canvas!.height !== canvas!.clientHeight) {
                canvas!.width = canvas!.clientWidth;
                canvas!.height = canvas!.clientHeight;
                gl!.viewport(0, 0, canvas!.width, canvas!.height);
            }
            gl!.uniform1f(timeLoc, time);
            gl!.uniform2f(resLoc, canvas!.width, canvas!.height);
            gl!.drawArrays(gl!.TRIANGLES, 0, 6);
            rafId = requestAnimationFrame(render);
        }
        rafId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(rafId);
    }, [canvasRef]);
}

// ─── Sent-confirmation illustration ───────────────────────────────────────────
function EmailSentIcon() {
    return (
        <svg
            className="w-16 h-16 mx-auto mb-4"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="64" rx="32" fill="#eff4ff" />
            <path
                d="M14 22a2 2 0 0 1 2-2h32a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V22z"
                stroke="#006c49"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M14 22l18 13 18-13"
                stroke="#006c49"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="46" cy="20" r="7" fill="#006c49" />
            <path
                d="M43 20l2 2 4-4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ForgotPasswordPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useShaderBackground(canvasRef);

    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        // Simulate async request
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    }

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />

            <style>{`
        .fp-root {
          background-color: #F8F9FF;
          font-family: 'Hanken Grotesk', sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .auth-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.5);
          box-shadow: 0px 4px 12px rgba(0,0,0,0.02);
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        #shader-canvas-fp {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: -20;
          pointer-events: none;
        }
        .fp-input {
          width: 100%;
          height: 48px;
          padding-left: 44px;
          padding-right: 16px;
          border: 1px solid #c6c6cd;
          border-radius: 8px;
          font-size: 14px;
          color: #0b1c30;
          background: white;
          outline: none;
          transition: border-color 0.15s ease;
          font-family: 'Hanken Grotesk', sans-serif;
        }
        .fp-input:focus {
          border-color: #0b1c30;
        }
        .fp-btn-primary {
          width: 100%;
          height: 48px;
          background: #0b1c30;
          color: white;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.1s ease;
          font-family: 'Hanken Grotesk', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .fp-btn-primary:hover { opacity: 0.88; }
        .fp-btn-primary:active { transform: scale(0.98); }
        .fp-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .fp-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fp-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>

            <div className="fp-root">
                {/* WebGL background */}
                <canvas id="shader-canvas-fp" ref={canvasRef} />

                {/* ── Header ── */}
                <header className="w-full top-0 sticky bg-white/80 backdrop-blur-md border-b border-[#c6c6cd] z-50">
                    <div className="flex justify-between items-center h-16 px-4 max-w-[1280px] mx-auto">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[32px]">local_parking</span>
                            <span className="text-xl font-bold text-[#0b1c30]">ParkFlow</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-[#45464d] text-sm hover:text-black transition-colors" href="#">Find Parking</a>
                            <a className="text-[#45464d] text-sm hover:text-black transition-colors" href="#">About</a>
                            <a className="text-[#45464d] text-sm hover:text-black transition-colors" href="#">Contact</a>
                        </nav>
                        <div>
                            <a className="text-black font-bold text-sm hover:opacity-80 transition-all px-4 py-2" href="#">
                                Host Slot
                            </a>
                        </div>
                    </div>
                </header>

                {/* ── Main content ── */}
                <main className="flex-grow flex items-center justify-center p-4 relative z-10">
                    <div className="w-full max-w-[440px] space-y-6">

                        {!submitted ? (
                            /* ── Request-reset card ── */
                            <div className="auth-card p-10 rounded-xl fp-fade-in">
                                {/* Icon */}
                                <div className="flex justify-center mb-5">
                                    <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[28px] text-[#006c49]">lock_reset</span>
                                    </div>
                                </div>

                                <div className="mb-6 space-y-2 text-center">
                                    <h1 className="text-2xl font-bold text-[#0b1c30]">Reset your password</h1>
                                    <p className="text-sm text-[#7c839b]">
                                        Enter your email address and we'll send you a link to reset your password.
                                    </p>
                                </div>

                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {/* Email field */}
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="fp-email"
                                            className="block text-xs text-[#45464d] uppercase font-semibold tracking-wide"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3 text-[#45464d] text-[20px]">
                                                alternate_email
                                            </span>
                                            <input
                                                id="fp-email"
                                                type="email"
                                                required
                                                placeholder="name@company.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="fp-input"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        id="fp-submit"
                                        type="submit"
                                        disabled={loading}
                                        className="fp-btn-primary mt-2"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="fp-spinner" />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-[18px]">send</span>
                                                Send Reset Link
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Back to sign in */}
                                <div className="text-center mt-5">
                                    <a
                                        id="fp-back-signin"
                                        href="#"
                                        className="text-sm text-[#7c839b] hover:text-[#0b1c30] transition-colors inline-flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                        Back to Sign In
                                    </a>
                                </div>
                            </div>
                        ) : (
                            /* ── Confirmation card ── */
                            <div className="auth-card p-10 rounded-xl text-center fp-fade-in">
                                <EmailSentIcon />
                                <h1 className="text-2xl font-bold text-[#0b1c30] mb-2">Check your inbox</h1>
                                <p className="text-sm text-[#7c839b] mb-1">
                                    We sent a password reset link to
                                </p>
                                <p className="text-sm font-semibold text-[#0b1c30] mb-6 break-all">{email}</p>
                                <p className="text-xs text-[#7c839b] mb-6">
                                    Didn't receive the email? Check your spam folder or{" "}
                                    <button
                                        id="fp-resend"
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="text-[#0b1c30] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
                                    >
                                        try another address
                                    </button>
                                    .
                                </p>
                                <a
                                    id="fp-back-signin-confirm"
                                    href="#"
                                    className="text-sm text-[#7c839b] hover:text-[#0b1c30] transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    Back to Sign In
                                </a>
                            </div>
                        )}
                    </div>
                </main>

                {/* ── Bottom bento info strip ── */}
                <section className="max-w-[1280px] mx-auto px-4 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    {[
                        {
                            icon: "security",
                            title: "Verified Spots",
                            body: "Every parking slot is manually verified by our team for safety and accessibility.",
                        },
                        {
                            icon: "speed",
                            title: "Instant Booking",
                            body: "Reserve your spot in under 60 seconds with our high-speed transaction infrastructure.",
                        },
                        {
                            icon: "account_balance_wallet",
                            title: "Fair Pricing",
                            body: "Dynamic pricing ensures you get the best rates based on real-time availability.",
                        },
                    ].map(({ icon, title, body }) => (
                        <div
                            key={title}
                            className="bg-[#eff4ff]/80 backdrop-blur-sm border border-[#c6c6cd] p-6 rounded-xl flex flex-col gap-2"
                        >
                            <span className="material-symbols-outlined text-[#006c49]">{icon}</span>
                            <h3 className="text-base font-semibold text-[#0b1c30]">{title}</h3>
                            <p className="text-sm text-[#45464d]">{body}</p>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}
