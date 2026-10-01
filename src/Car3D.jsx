import {
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";

import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const exteriorColors = [
  { name: "Original", value: null },
  { name: "Black", value: "#111111" },
  { name: "White", value: "#eeeeee" },
  { name: "Red", value: "#8f1010" },
  { name: "Blue", value: "#173f75" },
  { name: "Silver", value: "#a9adb3" },
];

const wheelStyles = [
  {
    name: "Original",
    value: "original",
    description: "Factory wheels",
  },
  {
    name: "Sport",
    value: "sport",
    description: "Sport design",
  },
  {
    name: "Performance",
    value: "performance",
    description: "Performance design",
  },
  {
    name: "Luxury",
    value: "luxury",
    description: "Premium design",
  },
];

function isBodyMaterial(material) {
  if (!material) return false;

  const name =
    material.name?.toLowerCase() || "";

  const bodyKeywords = [
    "body",
    "paint",
    "carpaint",
    "car_paint",
    "exterior",
    "shell",
    "vehicle",
    "metallic",
  ];

  const excludedKeywords = [
    "glass",
    "window",
    "windshield",
    "tire",
    "tyre",
    "wheel",
    "rim",
    "chrome",
    "light",
    "headlight",
    "taillight",
    "tail",
    "brake",
    "disc",
    "interior",
    "seat",
    "dashboard",
    "carbon",
    "plastic",
    "rubber",
  ];

  const hasBodyKeyword =
    bodyKeywords.some((keyword) =>
      name.includes(keyword)
    );

  const hasExcludedKeyword =
    excludedKeywords.some((keyword) =>
      name.includes(keyword)
    );

  return (
    hasBodyKeyword &&
    !hasExcludedKeyword
  );
}

function getWheelCandidate(
  object
) {
  if (!object.isMesh) {
    return false;
  }

  const meshName =
    object.name?.toLowerCase() || "";

  const materialName =
    Array.isArray(object.material)
      ? object.material
          .map(
            (material) =>
              material?.name?.toLowerCase() ||
              ""
          )
          .join(" ")
      : object.material?.name?.toLowerCase() ||
        "";

  const combined =
    `${meshName} ${materialName}`;

  return (
    combined.includes("wheel") ||
    combined.includes("rim") ||
    combined.includes("tire") ||
    combined.includes("tyre") ||
    combined.includes("disc") ||
    combined.includes("brake")
  );
}

function getWheelStyle(
  object
) {
  const meshName =
    object.name?.toLowerCase() || "";

  const materialName =
    Array.isArray(object.material)
      ? object.material
          .map(
            (material) =>
              material?.name?.toLowerCase() ||
              ""
          )
          .join(" ")
      : object.material?.name?.toLowerCase() ||
        "";

  const name =
    `${meshName} ${materialName}`;

  if (
    name.includes("max2")
  ) {
    return "luxury";
  }

  if (
    name.includes("max1")
  ) {
    return "performance";
  }

  if (
    name.includes("max")
  ) {
    return "sport";
  }

  if (
    name.includes("rim_1")
  ) {
    return "original";
  }

  return null;
}

function DynamicCarModel({
  modelPath,
  selectedColor,
  selectedWheel,
  onMeshList,
}) {
  const { scene } =
    useGLTF(modelPath);

  const originalColors =
    useRef(new Map());

  const normalized = useMemo(() => {
    const model =
      scene.clone(true);

    const box =
      new THREE.Box3().setFromObject(
        model
      );

    const size =
      box.getSize(
        new THREE.Vector3()
      );

    const center =
      box.getCenter(
        new THREE.Vector3()
      );

    const maxDimension =
      Math.max(
        size.x,
        size.y,
        size.z
      );

    const scale =
      maxDimension > 0
        ? 5 / maxDimension
        : 1;

    model.scale.setScalar(
      scale
    );

    model.position.x =
      -center.x * scale;

    model.position.y =
      -center.y * scale;

    model.position.z =
      -center.z * scale;

    return model;
  }, [scene]);

  /*
  ============================================
  SAVE ORIGINAL COLORS
  ============================================
  */

  useEffect(() => {
    normalized.traverse(
      (object) => {
        if (
          !object.isMesh ||
          !object.material
        ) {
          return;
        }

        const materials =
          Array.isArray(
            object.material
          )
            ? object.material
            : [object.material];

        materials.forEach(
          (material) => {
            if (
              isBodyMaterial(
                material
              ) &&
              !originalColors.current.has(
                material.uuid
              )
            ) {
              originalColors.current.set(
                material.uuid,
                material.color
                  ? material.color.clone()
                  : null
              );
            }
          }
        );
      }
    );
  }, [normalized]);

  /*
  ============================================
  EXTERIOR COLOR
  ============================================
  */

  useEffect(() => {
    normalized.traverse(
      (object) => {
        if (
          !object.isMesh ||
          !object.material
        ) {
          return;
        }

        const materials =
          Array.isArray(
            object.material
          )
            ? object.material
            : [object.material];

        materials.forEach(
          (material) => {
            if (
              !isBodyMaterial(
                material
              )
            ) {
              return;
            }

            if (
              !material.color
            ) {
              return;
            }

            if (
              selectedColor ===
              null
            ) {
              const original =
                originalColors.current.get(
                  material.uuid
                );

              if (original) {
                material.color.copy(
                  original
                );
              }
            } else {
              material.color.set(
                selectedColor
              );
            }

            material.needsUpdate =
              true;
          }
        );
      }
    );
  }, [
    normalized,
    selectedColor,
  ]);

  /*
  ============================================
  FIND ALL MESHES
  ============================================
  */

  useEffect(() => {
    const allMeshes = [];
    const wheelMeshes = [];

    normalized.traverse(
      (object) => {
        if (!object.isMesh) {
          return;
        }

        const meshData = {
          meshName:
            object.name ||
            "(unnamed mesh)",

          materialName:
            Array.isArray(
              object.material
            )
              ? object.material
                  .map(
                    (material) =>
                      material?.name ||
                      ""
                  )
                  .join(", ")
              : object.material?.name ||
                "",
        };

        allMeshes.push(
          meshData
        );

        if (
          getWheelCandidate(
            object
          )
        ) {
          wheelMeshes.push(
            {
              ...meshData,
              style:
                getWheelStyle(
                  object
                ),
            }
          );
        }
      }
    );

    console.warn(
      "========================================"
    );

    console.warn(
      "CAR EXPLORER - GLB MESH INSPECTOR"
    );

    console.warn(
      "MODEL:",
      modelPath
    );

    console.warn(
      "TOTAL MESHES:",
      allMeshes.length
    );

    console.warn(
      "WHEEL MESHES:",
      wheelMeshes
    );

    console.warn(
      "ALL MESHES:",
      allMeshes
    );

    console.warn(
      "========================================"
    );

    if (onMeshList) {
      onMeshList({
        allMeshes,
        wheelMeshes,
      });
    }
  }, [
    normalized,
    modelPath,
    onMeshList,
  ]);

  /*
  ============================================
  WHEEL VISIBILITY
  ============================================
  */

  useEffect(() => {
    normalized.traverse(
      (object) => {
        if (!object.isMesh) {
          return;
        }

        if (
          !getWheelCandidate(
            object
          )
        ) {
          return;
        }

        const style =
          getWheelStyle(
            object
          );

        /*
        Only hide/show meshes that
        have been positively identified.
        */

        if (
          style === null
        ) {
          return;
        }

        if (
          selectedWheel ===
          "original"
        ) {
          object.visible =
            style ===
            "original";
        } else {
          object.visible =
            style ===
            selectedWheel;
        }
      }
    );
  }, [
    normalized,
    selectedWheel,
  ]);

  return (
    <primitive
      object={normalized}
    />
  );
}

function CameraController({
  view,
  controlsRef,
}) {
  const { camera } =
    useThree();

  useEffect(() => {
    if (
      !controlsRef.current
    ) {
      return;
    }

    if (
      view === "front"
    ) {
      camera.position.set(
        0,
        1.5,
        8
      );
    }

    if (
      view === "side"
    ) {
      camera.position.set(
        8,
        1.5,
        0
      );
    }

    if (
      view === "rear"
    ) {
      camera.position.set(
        0,
        1.5,
        -8
      );
    }

    if (
      view === "interior"
    ) {
      camera.position.set(
        0,
        1.2,
        2.5
      );
    }

    controlsRef.current.target.set(
      0,
      0,
      0
    );

    controlsRef.current.update();
  }, [
    view,
    camera,
    controlsRef,
  ]);

  return null;
}

function Hotspot({
  position,
}) {
  return (
    <Html
      position={position}
    >
      <div className="hotspot">
        +
      </div>
    </Html>
  );
}

function Car3D({
  view = "front",
  variant,
  modelPath,
}) {
  const controlsRef =
    useRef(null);

  const [
    selectedColor,
    setSelectedColor,
  ] = useState(null);

  const [
    selectedWheel,
    setSelectedWheel,
  ] = useState(
    "original"
  );

  const [
    meshInfo,
    setMeshInfo,
  ] = useState({
    allMeshes: [],
    wheelMeshes: [],
  });

  const [
    showInspector,
    setShowInspector,
  ] = useState(false);

  const actualModelPath =
    modelPath ||
    variant?.modelPath ||
    "/models/bmw-m4.glb";

  useEffect(() => {
    setSelectedColor(null);
    setSelectedWheel(
      "original"
    );

    setMeshInfo({
      allMeshes: [],
      wheelMeshes: [],
    });
  }, [
    actualModelPath,
  ]);

  const currentWheel =
    wheelStyles.find(
      (wheel) =>
        wheel.value ===
        selectedWheel
    );

  return (
    <div className="car-3d-container">

      <Canvas
        camera={{
          position: [
            0,
            1.5,
            8,
          ],
          fov: 45,
          near: 0.01,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
      >

        <ambientLight
          intensity={1.8}
        />

        <directionalLight
          position={[
            5,
            8,
            5,
          ]}
          intensity={3}
        />

        <directionalLight
          position={[
            -5,
            5,
            5,
          ]}
          intensity={2}
        />

        <pointLight
          position={[
            0,
            5,
            5,
          ]}
          intensity={2}
        />

        <pointLight
          position={[
            0,
            2,
            -5,
          ]}
          intensity={1.5}
        />

        <Environment
          preset="studio"
        />

        <DynamicCarModel
          key={
            actualModelPath
          }
          modelPath={
            actualModelPath
          }
          selectedColor={
            selectedColor
          }
          selectedWheel={
            selectedWheel
          }
          onMeshList={
            setMeshInfo
          }
        />

        <CameraController
          view={view}
          controlsRef={
            controlsRef
          }
        />

        <Hotspot
          position={[
            2,
            1,
            1,
          ]}
        />

        <Hotspot
          position={[
            -2,
            1,
            0,
          ]}
        />

        <OrbitControls
          ref={
            controlsRef
          }
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.08}
          minDistance={2}
          maxDistance={20}
        />

      </Canvas>

      {/* =====================================
          EXTERIOR COLOR
          ===================================== */}

      <div className="vehicle-color-panel">

        <div className="vehicle-color-title">

          <span>
            EXTERIOR COLOR
          </span>

          <strong>
            {selectedColor ===
            null
              ? "Original"
              : exteriorColors.find(
                  (color) =>
                    color.value ===
                    selectedColor
                )?.name ||
                "Custom"}
          </strong>

        </div>

        <div className="vehicle-color-options">

          {exteriorColors.map(
            (color) => (

              <button
                key={
                  color.name
                }
                className={
                  selectedColor ===
                  color.value
                    ? "color-option active"
                    : "color-option"
                }
                onClick={() =>
                  setSelectedColor(
                    color.value
                  )
                }
                title={
                  color.name
                }
                aria-label={
                  color.name
                }
              >

                {color.value ===
                null ? (

                  <span className="original-color">
                    ↻
                  </span>

                ) : (

                  <span
                    className="color-circle"
                    style={{
                      backgroundColor:
                        color.value,
                    }}
                  />

                )}

              </button>

            )
          )}

        </div>

      </div>

      {/* =====================================
          WHEEL SELECTOR
          ===================================== */}

      <div className="wheel-selection-panel">

        <div className="wheel-selection-header">

          <div>

            <span className="wheel-selection-label">
              WHEELS & RIMS
            </span>

            <strong>
              {
                currentWheel?.name ||
                "Original"
              }
            </strong>

          </div>

          <span className="wheel-selection-description">
            {
              currentWheel?.description ||
              "Factory wheels"
            }
          </span>

        </div>

        <div className="wheel-options">

          {wheelStyles.map(
            (wheel) => (

              <button
                key={
                  wheel.value
                }
                className={
                  selectedWheel ===
                  wheel.value
                    ? "wheel-option active"
                    : "wheel-option"
                }
                onClick={() =>
                  setSelectedWheel(
                    wheel.value
                  )
                }
              >

                <span className="wheel-preview">

                  {wheel.value ===
                    "original" && (
                    <span className="wheel-icon original-wheel">
                      ◉
                    </span>
                  )}

                  {wheel.value ===
                    "sport" && (
                    <span className="wheel-icon sport-wheel">
                      ✦
                    </span>
                  )}

                  {wheel.value ===
                    "performance" && (
                    <span className="wheel-icon performance-wheel">
                      ✹
                    </span>
                  )}

                  {wheel.value ===
                    "luxury" && (
                    <span className="wheel-icon luxury-wheel">
                      ◈
                    </span>
                  )}

                </span>

                <span className="wheel-option-text">

                  <strong>
                    {
                      wheel.name
                    }
                  </strong>

                  <small>
                    {
                      wheel.description
                    }
                  </small>

                </span>

              </button>

            )
          )}

        </div>

      </div>

      {/* =====================================
          MESH INSPECTOR
          ===================================== */}

      <button
        onClick={() =>
          setShowInspector(
            !showInspector
          )
        }
        style={{
          position:
            "absolute",
          top: "15px",
          right: "15px",
          zIndex: 20,
          padding:
            "9px 14px",
          border:
            "1px solid rgba(255,255,255,0.25)",
          borderRadius:
            "8px",
          background:
            "rgba(0,0,0,0.75)",
          color: "white",
          cursor: "pointer",
          fontSize: "11px",
          letterSpacing:
            "0.5px",
        }}
      >
        {showInspector
          ? "HIDE MESHES"
          : "SHOW MESHES"}
      </button>

      {showInspector && (

        <div
          style={{
            position:
              "absolute",
            top: "55px",
            right: "15px",
            zIndex: 19,
            width: "360px",
            maxHeight:
              "420px",
            overflowY:
              "auto",
            padding:
              "16px",
            background:
              "rgba(5,5,5,0.95)",
            border:
              "1px solid rgba(255,255,255,0.15)",
            borderRadius:
              "12px",
            color:
              "white",
            fontSize:
              "11px",
          }}
        >

          <div
            style={{
              marginBottom:
                "14px",
              fontWeight:
                "bold",
              fontSize:
                "13px",
            }}
          >
            GLB MESH INSPECTOR
          </div>

          <div
            style={{
              marginBottom:
                "12px",
              opacity:
                0.65,
            }}
          >
            Model:
            <br />
            {actualModelPath}
          </div>

          <div
            style={{
              marginBottom:
                "12px",
              fontWeight:
                "bold",
            }}
          >
            Wheel Meshes (
            {
              meshInfo
                .wheelMeshes
                .length
            }
            )
          </div>

          {meshInfo.wheelMeshes.length ===
          0 ? (

            <div
              style={{
                padding:
                  "12px",
                borderRadius:
                  "8px",
                background:
                  "rgba(255,0,0,0.12)",
                color:
                  "#ff9999",
              }}
            >
              No wheel meshes
              detected.
            </div>

          ) : (

            meshInfo.wheelMeshes.map(
              (
                mesh,
                index
              ) => (

                <div
                  key={
                    `${mesh.meshName}-${index}`
                  }
                  style={{
                    marginBottom:
                      "8px",
                    padding:
                      "9px",
                    borderRadius:
                      "7px",
                    background:
                      "rgba(255,255,255,0.06)",
                  }}
                >

                  <strong>
                    {mesh.meshName}
                  </strong>

                  <br />

                  <span
                    style={{
                      opacity:
                        0.55,
                    }}
                  >
                    Material:{" "}
                    {
                      mesh.materialName ||
                      "None"
                    }
                  </span>

                  <br />

                  <span
                    style={{
                      opacity:
                        0.7,
                    }}
                  >
                    Detected:
                    {" "}
                    {
                      mesh.style ||
                      "Unknown"
                    }
                  </span>

                </div>

              )
            )

          )}

          <div
            style={{
              marginTop:
                "16px",
              marginBottom:
                "10px",
              fontWeight:
                "bold",
            }}
          >
            Total Meshes:{" "}
            {
              meshInfo
                .allMeshes
                .length
            }
          </div>

          <div
            style={{
              opacity:
                0.5,
              fontSize:
                "10px",
            }}
          >
            This panel is temporary.
            We will remove it
            after the wheel
            configuration is
            working.
          </div>

        </div>

      )}

      {/* =====================================
          VIEWER CONTROLS
          ===================================== */}

      <div className="viewer-controls">

        <div className="viewer-controls-left">

          <button
            className="viewer-control-button"
            onClick={() => {
              if (
                controlsRef.current
              ) {
                controlsRef.current.reset();
              }
            }}
          >
            Reset View
          </button>

          <button
            className="viewer-control-button"
            onClick={() => {
              if (
                controlsRef.current
              ) {
                const camera =
                  controlsRef.current
                    .object;

                camera.position.multiplyScalar(
                  0.85
                );

                controlsRef.current.update();
              }
            }}
          >
            + Zoom
          </button>

          <button
            className="viewer-control-button"
            onClick={() => {
              if (
                controlsRef.current
              ) {
                const camera =
                  controlsRef.current
                    .object;

                camera.position.multiplyScalar(
                  1.15
                );

                controlsRef.current.update();
              }
            }}
          >
            − Zoom
          </button>

        </div>

        <div className="viewer-instructions">
          Drag to rotate • Scroll to zoom
        </div>

      </div>

      {/* =====================================
          INTERIOR
          ===================================== */}

      {view ===
        "interior" && (

        <div className="interior-message">

          <div className="interior-message-box">

            <span>
              INTERIOR EXPERIENCE
            </span>

            <h3>
              {
                variant?.variant ||
                "Vehicle"
              }{" "}
              Interior
            </h3>

            <p>
              Explore the
              driver's cockpit,
              dashboard and
              interior technology.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

useGLTF.preload(
  "/models/bmw-m4.glb"
);

useGLTF.preload(
  "/models/mercedes-c-class.glb"
);

useGLTF.preload(
  "/models/audi-a6.glb"
);

useGLTF.preload(
  "/models/hyundai-creta.glb"
);

useGLTF.preload(
  "/models/tesla-model-3.glb"
);

export default Car3D;