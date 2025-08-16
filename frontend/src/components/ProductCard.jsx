import ModelViewer from "./ModelViewer.jsx";

export default function ProductCard({ image, modelUrl }) {
  return (
    <div className="w-60 h-60 bg-white m-4 shadow-lg overflow-hidden">
      {modelUrl ? (
        <div className="w-full h-full">
          <ModelViewer url={modelUrl} />
        </div>
      ) : (
        <img
          src={image}
          alt="Product"
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}

