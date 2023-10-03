import { Noir } from '@kevaundray/noir_js';
import { BarretenbergBackend } from '@kevaundray/backend_barretenberg';
import circuit from './circuit/target/circuit.json';

document.addEventListener('DOMContentLoaded', async () => {
    const backend = new BarretenbergBackend(circuit);
    const noir = new Noir(circuit, backend);

    display("logs", "Init... ⌛")
    await noir.init();
    display("logs", "Init... ✅")

    const input = { x: 1, y: 2 };

    display("logs", "Generating proof... ⌛")
    const proof = await noir.generateFinalProof(input);
    display("logs", "Generating proof... ✅")
    display("results", proof);


    display("logs", "Verifying proof... ⌛")
    const verification = await noir.verifyFinalProof(proof);
    if (verification) display("logs", "Verifying proof... ✅")
});

function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement("p");
  p.textContent = msg;
  c.appendChild(p);
}

