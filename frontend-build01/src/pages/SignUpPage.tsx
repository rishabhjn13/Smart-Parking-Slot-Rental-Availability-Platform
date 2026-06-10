import { useEffect, useRef, FormEvent } from "react";

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

// ─── Google SVG ───────────────────────────────────────────────────────────────
function GoogleIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.09-3.71 1.09-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.87 14.15c-.22-.67-.35-1.38-.35-2.15s.13-1.48.35-2.15V7.01H2.18C1.4 8.58 1 10.33 1 12s.4 3.42 1.18 4.99l3.69-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.01l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.47z" fill="#EA4335" />
        </svg>
    );
}

// ─── Apple SVG ────────────────────────────────────────────────────────────────
function AppleIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.39C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.75.9-.01 2.1-.81 3.5-.66 1.43.15 2.5.73 3.07 1.61-2.91 1.74-2.45 5.51.46 6.7-.63 1.57-1.45 3.12-2.11 4.57zm-4.71-13.11c-.07-1.78 1.48-3.32 3.16-3.41.22 1.95-1.74 3.53-3.16 3.41z" />
        </svg>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SignUpPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useShaderBackground(canvasRef);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // TODO: wire up registration logic
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
        .signup-root {
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
        #shader-canvas-signup {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: -20;
          pointer-events: none;
        }
      `}</style>

            <div className="signup-root">
                {/* WebGL background */}
                <canvas id="shader-canvas-signup" ref={canvasRef} />

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
                    </div>
                </header>

                {/* ── Main sign-up content ── */}
                <main className="flex-grow flex items-center justify-center p-4 relative z-10">
                    <div className="w-full max-w-[480px] space-y-6">

                        {/* Card */}
                        <div className="auth-card p-10 rounded-xl">
                            <div className="mb-6 space-y-2">
                                <h1 className="text-2xl font-bold text-[#0b1c30]">Create an account</h1>
                                <p className="text-sm text-[#7c839b]">
                                    Join ParkFlow to start managing your parking slots or find the perfect space.
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Name row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-[#45464d] uppercase font-semibold tracking-wide">
                                            First Name
                                        </label>
                                        <input
                                            id="signup-first-name"
                                            type="text"
                                            placeholder="John"
                                            className="w-full h-12 px-4 border border-[#c6c6cd] rounded-lg text-sm text-[#0b1c30] bg-white focus:ring-0 focus:border-black transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-[#45464d] uppercase font-semibold tracking-wide">
                                            Last Name
                                        </label>
                                        <input
                                            id="signup-last-name"
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full h-12 px-4 border border-[#c6c6cd] rounded-lg text-sm text-[#0b1c30] bg-white focus:ring-0 focus:border-black transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Email or Phone */}
                                <div className="space-y-1">
                                    <label className="text-xs text-[#45464d] uppercase font-semibold tracking-wide">
                                        Email or Phone
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-[#45464d] text-[20px]">
                                            alternate_email
                                        </span>
                                        <input
                                            id="signup-email"
                                            type="text"
                                            placeholder="name@company.com"
                                            className="w-full h-12 pl-11 pr-4 border border-[#c6c6cd] rounded-lg text-sm text-[#0b1c30] bg-white focus:ring-0 focus:border-black transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1">
                                    <label className="text-xs text-[#45464d] uppercase font-semibold tracking-wide">
                                        Password
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-[#45464d] text-[20px]">
                                            lock
                                        </span>
                                        <input
                                            id="signup-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full h-12 pl-11 pr-4 border border-[#c6c6cd] rounded-lg text-sm text-[#0b1c30] bg-white focus:ring-0 focus:border-black transition-all outline-none"
                                        />
                                    </div>
                                    <p className="text-[12px] text-[#7c839b]">Must be at least 8 characters long.</p>
                                </div>

                                {/* Submit */}
                                <button
                                    id="signup-submit"
                                    type="submit"
                                    className="w-full h-12 mt-4 bg-black text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    Create Account
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#c6c6cd]" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-white/80 px-4 text-[#45464d] font-semibold uppercase tracking-wide">
                                        OR CONTINUE WITH
                                    </span>
                                </div>
                            </div>

                            {/* OAuth */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    id="signup-google"
                                    type="button"
                                    className="flex items-center justify-center gap-2 h-12 border border-[#c6c6cd] rounded-lg hover:bg-[#eff4ff] transition-colors active:scale-[0.98]"
                                >
                                    <GoogleIcon />
                                    <span className="text-sm font-semibold text-[#0b1c30]">Google</span>
                                </button>
                                <button
                                    id="signup-apple"
                                    type="button"
                                    className="flex items-center justify-center gap-2 h-12 border border-[#c6c6cd] rounded-lg hover:bg-[#eff4ff] transition-colors active:scale-[0.98]"
                                >
                                    <AppleIcon />
                                    <span className="text-sm font-semibold text-[#0b1c30]">Apple</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer link */}
                        <div className="text-center pb-10">
                            <p className="text-sm text-[#7c839b]">
                                Already have an account?{" "}
                                <a className="text-black font-bold hover:underline transition-all" href="/auth/login">
                                    Sign In
                                </a>
                            </p>
                        </div>
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
