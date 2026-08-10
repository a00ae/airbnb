import PopularApartments from "./apartments/PopularApartments"




const Main = () => {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)"
    }} className="main">
        <PopularApartments />

    </div>
  )
}

export default Main