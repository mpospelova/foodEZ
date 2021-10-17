export default function FoodCard({ name, quantity, unit }) {
  return (
    <div className="food_card">
      <h3>
        {name}, {quantity} {unit}
      </h3>
    </div>
  );
}
