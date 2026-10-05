"use client";

import { useEffect, useRef, useState } from "react";

const FECHA_EVENTO = new Date("2026-10-20T21:00:00");

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const [numeroInvitados, setNumeroInvitados] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const audioRef = useRef(null);

  const [tiempo, setTiempo] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const actualizarContador = () => {
      const ahora = new Date();

      const diferencia =
        FECHA_EVENTO.getTime() - ahora.getTime();

      if (diferencia <= 0) {
        setTiempo({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });

        return;
      }

      const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
      );

      const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
      );

      const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
      );

      const segundos = Math.floor(
        (diferencia / 1000) % 60
      );

      setTiempo({
        dias,
        horas,
        minutos,
        segundos,
      });
    };

    actualizarContador();

    const intervalo = setInterval(
      actualizarContador,
      1000
    );

    return () => clearInterval(intervalo);
  }, []);

  const continuar = async () => {
    if (nombre.trim() === "") {
      alert("Por favor, ingresa tu nombre completo.");
      return;
    }

    setInvitacionAbierta(true);

    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.35;

        await audioRef.current.play();

        setMusicaActiva(true);
      }
    } catch (error) {
      console.log(
        "La reproducción automática fue bloqueada."
      );

      setMusicaActiva(false);
    }
  };

  const controlarMusica = async () => {
    if (!audioRef.current) {
      return;
    }

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();

        setMusicaActiva(true);
      } catch (error) {
        console.log(
          "No se pudo reproducir la música."
        );
      }
    } else {
      audioRef.current.pause();

      setMusicaActiva(false);
    }
  };

  const confirmarInvitados = () => {
    if (numeroInvitados === "") {
      alert(
        "Por favor, selecciona el número de invitados."
      );

      return;
    }

    setConfirmado(true);
  };

  return (
    <main
      className="min-h-screen text-[#5d4a43]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(250, 232, 235, 0.55), rgba(250, 232, 235, 0.55)), url('/images/fondo-floral.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* ==========================================
          MÚSICA
      ========================================== */}

      <audio
        ref={audioRef}
        src="/music/veo-en-ti-la-luz.mp3"
        loop
        preload="auto"
      />

      {/* ==========================================
          BRILLOS
      ========================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">

        <span className="brillo brillo-1">
          ✦
        </span>

        <span className="brillo brillo-2">
          ✧
        </span>

        <span className="brillo brillo-3">
          ✦
        </span>

        <span className="brillo brillo-4">
          ✧
        </span>

        <span className="brillo brillo-5">
          ✦
        </span>

      </div>

      {!invitacionAbierta ? (

        /* ==========================================
           PORTADA
        ========================================== */

        <section className="min-h-screen flex items-center justify-center px-5 py-10">

          <div className="relative w-full max-w-md">

            <div className="absolute inset-0 rounded-[35px] border border-[#c7a16b]/50"></div>

            <div className="relative overflow-hidden rounded-[35px] bg-[#fff8f7]/95 shadow-[0_20px_60px_rgba(112,77,64,0.25)]">

              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#ead4ca] to-transparent"></div>

              <div className="relative px-7 pt-8 text-center">

                <p className="text-[11px] tracking-[0.45em] uppercase text-[#9a806f]">
                  Mis quince años
                </p>

                <h1 className="mt-3 font-serif text-6xl text-[#87695c]">
                  Luana
                </h1>

                <p className="mt-2 text-xs tracking-[0.2em] uppercase text-[#b4936e]">
                  Mendoza Aguirre
                </p>

                <div className="mt-3 flex items-center justify-center gap-3 text-[#c5a06a]">

                  <span className="h-px w-12 bg-[#d8bd94]"></span>

                  <span className="text-xl">
                    ✦
                  </span>

                  <span className="h-px w-12 bg-[#d8bd94]"></span>

                </div>

                <div className="relative mt-7 mx-auto w-[82%]">

                  <div className="absolute -inset-2 rounded-t-[120px] rounded-b-[25px] border border-[#c7a16b]/60"></div>

                  <div className="relative overflow-hidden rounded-t-[120px] rounded-b-[25px]">

                    <img
                      src="/images/hero.jpg"
                      alt="Luana Mendoza Aguirre"
                      className="w-full h-[430px] object-cover"
                    />

                  </div>

                </div>

                <p className="mt-7 text-sm italic text-[#8e7970]">
                  "Hay momentos que se convierten en recuerdos
                  para toda la vida."
                </p>

                <p className="mt-2 text-sm text-[#8e7970]">
                  Quiero compartir este momento tan especial contigo.
                </p>

                <div className="mt-7 pb-8">

                  <label className="block text-left text-xs tracking-wide text-[#806c62] mb-2">
                    Ingresa tu nombre completo
                  </label>

                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) =>
                      setNombre(e.target.value)
                    }
                    placeholder="Ej. María López"
                    className="w-full rounded-xl border border-[#dbc7bd] bg-white px-4 py-3 text-sm text-[#5d4a43] outline-none transition focus:border-[#b99572] focus:ring-2 focus:ring-[#ead9d0]"
                  />

                  <button
                    onClick={continuar}
                    className="mt-4 w-full rounded-xl bg-[#b4936e] px-6 py-3 text-sm font-medium tracking-wide text-white shadow-md transition hover:bg-[#9d7d5c] active:scale-[0.98]"
                  >
                    ✦ Abrir mi invitación ✦
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

      ) : (

        /* ==========================================
           INVITACIÓN ABIERTA
        ========================================== */

        <section className="min-h-screen flex justify-center px-5 py-8">

          {/* ========================================
              BOTÓN DE MÚSICA
          ======================================== */}

          <button
            onClick={controlarMusica}
            className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-full bg-[#b4936e] px-5 py-3 text-sm font-medium text-white shadow-[0_8px_25px_rgba(112,77,64,0.30)] transition hover:bg-[#9d7d5c] active:scale-95"
          >

            <span className="text-lg">
              {musicaActiva ? "🔊" : "♫"}
            </span>

            <span>
              {musicaActiva
                ? "Música"
                : "Activar música"}
            </span>

          </button>

          {/* ========================================
              TARJETA PRINCIPAL
          ======================================== */}

          <div className="w-full max-w-md overflow-hidden rounded-[35px] bg-[#fffaf7]/95 shadow-[0_20px_60px_rgba(112,77,64,0.25)]">

            {/* FOTO PRINCIPAL */}

            <div className="relative">

              <img
                src="/images/hero.jpg"
                alt="Luana"
                className="h-[520px] w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#fffaf7] via-[#fffaf7]/80 to-transparent pt-40"></div>

              <div className="absolute bottom-7 left-0 right-0 text-center px-6">

                <p className="text-xs uppercase tracking-[0.35em] text-[#9a806f]">
                  Invitación especial
                </p>

                <h2 className="mt-3 font-serif text-4xl text-[#76594e]">
                  Querido/a {nombre}
                </h2>

              </div>

            </div>

            <div className="px-7 py-8 text-center">

              <p className="text-sm leading-7 text-[#806c62]">
                Estás cordialmente invitado/a a celebrar
                una noche muy especial.
              </p>

              <h1 className="mt-5 font-serif text-4xl text-[#87695c]">
                Mis XV años
              </h1>

              <h2 className="mt-1 font-serif text-5xl text-[#b4936e]">
                Luana
              </h2>

              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#9a806f]">
                Mendoza Aguirre
              </p>

              <div className="my-7 flex items-center justify-center gap-3">

                <span className="h-px w-12 bg-[#d8bd94]"></span>

                <span className="text-[#c5a06a]">
                  ✦
                </span>

                <span className="h-px w-12 bg-[#d8bd94]"></span>

              </div>

              {/* ====================================
                  FECHA
              ==================================== */}

              <div className="rounded-2xl border border-[#ead9d0] bg-[#fffaf7]/90 p-6">

                <p className="text-xs uppercase tracking-[0.3em] text-[#9a806f]">
                  El gran día
                </p>

                <p className="mt-4 font-serif text-3xl text-[#87695c]">
                  20 de octubre
                </p>

                <p className="mt-1 text-lg text-[#b4936e]">
                  2026
                </p>

                <div className="my-5 h-px bg-[#ead9d0]"></div>

                <p className="text-xs uppercase tracking-[0.3em] text-[#9a806f]">
                  Hora
                </p>

                <p className="mt-2 text-2xl font-serif text-[#87695c]">
                  9:00 PM
                </p>

              </div>

              {/* ====================================
                  CUENTA REGRESIVA
              ==================================== */}

              <div className="mt-8 rounded-2xl bg-[#f8eee9]/95 p-6">

                <p className="text-xs uppercase tracking-[0.3em] text-[#9a806f]">
                  Faltan
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2">

                  <div>
                    <p className="font-serif text-3xl text-[#87695c]">
                      {String(tiempo.dias).padStart(2, "0")}
                    </p>

                    <p className="text-[9px] uppercase tracking-wider text-[#9a806f]">
                      Días
                    </p>
                  </div>

                  <div>
                    <p className="font-serif text-3xl text-[#87695c]">
                      {String(tiempo.horas).padStart(2, "0")}
                    </p>

                    <p className="text-[9px] uppercase tracking-wider text-[#9a806f]">
                      Horas
                    </p>
                  </div>

                  <div>
                    <p className="font-serif text-3xl text-[#87695c]">
                      {String(tiempo.minutos).padStart(2, "0")}
                    </p>

                    <p className="text-[9px] uppercase tracking-wider text-[#9a806f]">
                      Minutos
                    </p>
                  </div>

                  <div>
                    <p className="font-serif text-3xl text-[#87695c]">
                      {String(tiempo.segundos).padStart(2, "0")}
                    </p>

                    <p className="text-[9px] uppercase tracking-wider text-[#9a806f]">
                      Segundos
                    </p>
                  </div>

                </div>

              </div>

              {/* FOTO XV */}

              <div className="mt-8 overflow-hidden rounded-2xl">

                <img
                  src="/images/fifteen.jpg"
                  alt="Luana XV años"
                  className="w-full h-[350px] object-cover"
                />

              </div>

              {/* PADRES */}

              <div className="mt-8 rounded-2xl bg-[#f8eee9]/95 p-7">

                <p className="text-xs uppercase tracking-[0.3em] text-[#9a806f]">
                  Con el amor de mis padres
                </p>

                <p className="mt-5 font-serif text-2xl text-[#87695c]">
                  Fernando Mendoza Puente
                </p>

                <p className="mt-2 text-[#b4936e]">
                  &
                </p>

                <p className="mt-2 font-serif text-2xl text-[#87695c]">
                  Lucero Aguirre Bartolome
                </p>

              </div>

              {/* RECEPCIÓN */}

              <div className="mt-8">

                <p className="text-xs uppercase tracking-[0.3em] text-[#9a806f]">
                  Recepción
                </p>

                <h3 className="mt-4 font-serif text-3xl text-[#87695c]">
                  La Estancia
                </h3>

                <p className="mt-1 text-lg text-[#b4936e]">
                  Country Club
                </p>

                <p className="mt-4 text-sm text-[#806c62]">
                  20 de octubre de 2026
                </p>

                <p className="mt-1 text-sm text-[#806c62]">
                  9:00 PM
                </p>

                <a
                  href="https://maps.app.goo.gl/sjb5fpzx84HjQaGy7?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-xl bg-[#b4936e] px-7 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#9d7d5c]"
                >
                  📍 Ver ubicación
                </a>

              </div>

              {/* VESTIMENTA */}

              <div className="mt-8 rounded-2xl border border-[#ead9d0] bg-[#fffaf7]/90 p-6">

                <p className="text-xs uppercase tracking-[0.3em] text-[#9a806f]">
                  Código de vestimenta
                </p>

                <p className="mt-4 font-serif text-2xl text-[#87695c]">
                  Etiqueta
                </p>

                <p className="mt-1 text-sm text-[#806c62]">
                  Vestimenta formal
                </p>

              </div>

              {/* ====================================
                  CONFIRMACIÓN DE ASISTENCIA
              ==================================== */}

              <div className="mt-8 rounded-[25px] border border-[#d8bd94] bg-[#fff8f6]/95 p-7 shadow-[0_10px_30px_rgba(112,77,64,0.10)]">

                <div className="flex items-center justify-center gap-3">

                  <span className="h-px w-10 bg-[#d8bd94]"></span>

                  <span className="text-xl text-[#b4936e]">
                    ♡
                  </span>

                  <span className="h-px w-10 bg-[#d8bd94]"></span>

                </div>

                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[#9a806f]">
                  Confirmación
                </p>

                <h3 className="mt-3 font-serif text-3xl text-[#87695c]">
                  Confirma tu asistencia
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#806c62]">
                  Por favor, indícanos cuántas personas
                  asistirán a esta celebración.
                </p>

                {!confirmado ? (

                  <>

                    <div className="mt-6 text-left">

                      <label className="mb-2 block text-xs text-[#806c62]">
                        Número de invitados
                      </label>

                      <select
                        value={numeroInvitados}
                        onChange={(e) =>
                          setNumeroInvitados(
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-[#dbc7bd] bg-white px-4 py-3 text-sm text-[#5d4a43] outline-none focus:border-[#b99572] focus:ring-2 focus:ring-[#ead9d0]"
                      >

                        <option value="">
                          Selecciona el número de invitados
                        </option>

                        <option value="1">
                          1 persona
                        </option>

                        <option value="2">
                          2 personas
                        </option>

                        <option value="3">
                          3 personas
                        </option>

                        <option value="4">
                          4 personas
                        </option>

                        <option value="5">
                          5 personas
                        </option>

                        <option value="6">
                          6 personas
                        </option>

                        <option value="7">
                          7 personas
                        </option>

                        <option value="8">
                          8 personas
                        </option>

                        <option value="9">
                          9 personas
                        </option>

                        <option value="10">
                          10 personas
                        </option>

                      </select>

                    </div>

                    <button
                      onClick={confirmarInvitados}
                      className="mt-5 w-full rounded-xl bg-[#b4936e] px-6 py-4 text-sm font-medium tracking-wide text-white shadow-md transition hover:bg-[#9d7d5c] active:scale-[0.98]"
                    >
                      ✓ Confirmar número de invitados
                    </button>

                  </>

                ) : (

                  <div className="mt-6 rounded-2xl bg-[#f8eee9] p-5">

                    <div className="text-3xl">
                      ✓
                    </div>

                    <p className="mt-3 font-serif text-2xl text-[#87695c]">
                      ¡Gracias, {nombre}!
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#806c62]">
                      Hemos registrado tu confirmación
                      para{" "}
                      <strong>
                        {numeroInvitados}{" "}
                        {numeroInvitados === "1"
                          ? "persona"
                          : "personas"}
                      </strong>
                      .
                    </p>

                    <p className="mt-3 text-xs text-[#9a806f]">
                      ¡Te esperamos para celebrar juntos!
                    </p>

                  </div>

                )}

              </div>

              {/* FOTO FINAL */}

              <div className="mt-8 overflow-hidden rounded-2xl">

                <img
                  src="/images/gown.jpg"
                  alt="Luana"
                  className="w-full h-[400px] object-cover"
                />

              </div>

              {/* FINAL */}

              <div className="px-2 py-10">

                <div className="flex items-center justify-center gap-3">

                  <span className="h-px w-12 bg-[#d8bd94]"></span>

                  <span className="text-[#c5a06a]">
                    ✦
                  </span>

                  <span className="h-px w-12 bg-[#d8bd94]"></span>

                </div>

                <h2 className="mt-6 font-serif text-4xl text-[#87695c]">
                  ¡Te esperamos!
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#806c62]">
                  Tu presencia hará que esta noche sea
                  aún más especial e inolvidable.
                </p>

                <p className="mt-6 font-serif text-2xl text-[#b4936e]">
                  Luana
                </p>

              </div>

            </div>

          </div>

        </section>

      )}

    </main>
  );
}
