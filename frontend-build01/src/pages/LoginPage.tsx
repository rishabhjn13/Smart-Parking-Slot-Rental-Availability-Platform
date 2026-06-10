import React, { useEffect, useRef } from 'react';

const LoginPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // WebGL animated grid background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const vsSource = `
      attribute vec4 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = a_position;
        v_texCoord = a_texCoord;
      }
    `;

        const fsSource = `
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

        function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }

        const program = gl.createProgram()!;
        gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
        gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1, 0, 0,
                1, -1, 1, 0,
                -1, 1, 0, 1,
                -1, 1, 0, 1,
                1, -1, 1, 0,
                1, 1, 1, 1,
            ]),
            gl.STATIC_DRAW
        );

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

        let rafId: number;

        function render(time: number) {
            if (!canvas || !gl) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.useProgram(program);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
            gl.enableVertexAttribArray(texCoordLocation);
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);
            gl.uniform1f(timeLocation, time * 0.001);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            rafId = requestAnimationFrame(render);
        }

        rafId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // Micro-interaction handlers
    const handlePressStart = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)';
    };
    const handlePressEnd = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.transform = '';
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-body-lg">
            {/* WebGL Background Canvas */}
            <canvas
                ref={canvasRef}
                id="webgl-canvas"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -10,
                }}
            />
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
            <main className="w-full max-w-[440px] relative z-10 p-4">
                {/* Brand Logo & Context */}
                {/* <div className="text-center mb-xl">
                    <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight mb-xs">
                        ParkFlow
                    </h1>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Seamless parking for urban movers.
                    </p>
                </div> */}

                {/* Login Card */}
                <div
                    className="rounded-xl p-xl shadow-lg"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(226, 232, 240, 0.5)',
                    }}
                >
                    <header className="mb-lg">
                        <h2 className="font-headline-md text-headline-md text-on-surface">Welcome back</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Please enter your details to sign in.
                        </p>
                    </header>

                    <form action="#" method="POST" className="space-y-md">
                        {/* Email Field */}
                        <div>
                            <label
                                className="block font-label-caps text-label-caps text-on-surface-variant mb-xs"
                                htmlFor="email"
                            >
                                EMAIL ADDRESS
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                                    mail
                                </span>
                                <input
                                    className="w-full pl-12 pr-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface transition-all focus:outline-none focus:border-on-surface focus:ring-2 focus:ring-surface-container"
                                    id="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    required
                                    type="email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                className="block font-label-caps text-label-caps text-on-surface-variant mb-xs"
                                htmlFor="password"
                            >
                                PASSWORD
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                                    lock
                                </span>
                                <input
                                    className="w-full pl-12 pr-md py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface transition-all focus:outline-none focus:border-on-surface focus:ring-2 focus:ring-surface-container"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    type="password"
                                />
                            </div>
                        </div>

                        {/* Secondary Actions Row */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-base cursor-pointer group">
                                <input
                                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all"
                                    type="checkbox"
                                />
                                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">
                                    Remember me
                                </span>
                            </label>
                            <a
                                className="font-body-sm text-body-sm font-semibold text-on-surface hover:underline"
                                href="#"
                                onMouseDown={handlePressStart}
                                onMouseUp={handlePressEnd}
                                onMouseLeave={handlePressEnd}
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Primary CTA */}
                        <button
                            className="w-full py-3 bg-primary text-on-primary font-body-lg text-body-lg font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
                            type="submit"
                            onMouseDown={handlePressStart}
                            onMouseUp={handlePressEnd}
                            onMouseLeave={handlePressEnd}
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-lg">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-outline-variant" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-surface-container-lowest/80 px-md font-label-caps text-label-caps text-on-surface-variant">
                                OR CONTINUE WITH
                            </span>
                        </div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-md">
                        <button
                            className="flex items-center justify-center gap-base py-3 border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                            onMouseDown={handlePressStart}
                            onMouseUp={handlePressEnd}
                            onMouseLeave={handlePressEnd}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button
                            className="flex items-center justify-center gap-base py-3 border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                            onMouseDown={handlePressStart}
                            onMouseUp={handlePressEnd}
                            onMouseLeave={handlePressEnd}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.152 6.896c-.448 0-1.088.352-1.424.352-.352 0-.912-.352-1.28-.352-1.472 0-2.864 1.296-2.864 3.312 0 2.032.992 4.192 2.4 4.192.48 0 1.056-.416 1.6-.416.544 0 1.024.416 1.664.416 1.232 0 2.224-1.872 2.224-3.12 0-.048-.016-.064-.016-.096-.944-.448-1.568-1.44-1.568-2.624 0-1.2 1.2-1.92 1.2-1.92-.448-.752-1.344-1.152-2.16-1.152zm-.512-4.112c-.864 0-1.744.752-1.744 1.808 0 .192.032.384.096.56.96 0 1.776-.784 1.776-1.824 0-.176-.016-.368-.08-.544-.016 0-.032 0-.048 0z" />
                            </svg>
                            Apple
                        </button>
                    </div>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-lg font-body-sm text-body-sm text-on-surface-variant">
                    Don't have an account?{' '}
                    <a
                        className="font-semibold text-on-surface hover:underline"
                        href="/auth/signup"
                        onMouseDown={handlePressStart}
                        onMouseUp={handlePressEnd}
                        onMouseLeave={handlePressEnd}
                    >
                        Signup for ParkFlow
                    </a>
                </p>
            </main>
        </div>
    );
};

export default LoginPage;
