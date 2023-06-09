import Grid from "./Grid";

const Navbar = ({ clearBoard, algorithm }) => {
  return (
    <nav>
      <ul>
        <li>
          <h1>Pathfinder Visualizer</h1>
        </li>
        <li>
          <p>Algorithms</p>
        </li>
        <li>
          <button onClick={clearBoard}>Clear board</button>
        </li>
        <li>
          <button onClick={algorithm}>Visualize!</button>
        </li>
      </ul>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          margin: 0;
          background-color: #2e282a;
        }

        ul,
        h1,
        p,
        button {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          margin-right: 5rem;
          padding: 0;
          color: #fff;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
