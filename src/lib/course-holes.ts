export type HoleProfile = {
  name: string;
  par: number;
  blueMetres: number;
  forwardMetres: number;
  description: string;
};

export const HOLE_PROFILES: Record<number, HoleProfile> = {
  1: { name: "Opening Fairway", par: 4, blueMetres: 392, forwardMetres: 330, description: "The opening drive begins close to the club precinct and moves into a generous fairway. The preferred side leaves a clear angle to a green protected by a measured arrangement of bunkers." },
  2: { name: "Villa Corridor", par: 5, blueMetres: 512, forwardMetres: 445, description: "A long, flowing hole beside the villa edge. Players can advance safely in stages or challenge the narrowing landing area to create a shorter approach." },
  3: { name: "Central Approach", par: 4, blueMetres: 401, forwardMetres: 350, description: "A broad central corridor rewards a confident tee shot. The approach tightens around sculpted sand, asking for precise distance control into the green." },
  4: { name: "Upper Green", par: 3, blueMetres: 178, forwardMetres: 145, description: "A compact one-shot hole framed by palms and bright bunkering. Its open view makes club selection simple, but the exposed green still demands an accurate strike." },
  5: { name: "Peninsula", par: 4, blueMetres: 368, forwardMetres: 315, description: "Water defines the visual character of this peninsula hole. A controlled drive sets up an approach where placement matters more than raw distance." },
  6: { name: "Eastern Edge", par: 5, blueMetres: 525, forwardMetres: 455, description: "The route stretches along the eastern course edge with room to play away from trouble. Stronger players may take on the corner to improve their third-shot position." },
  7: { name: "Palm Crossing", par: 3, blueMetres: 165, forwardMetres: 132, description: "A short hole across a natural break in the landscape. The green is visible from the tee, while surrounding palms and sand sharpen the target." },
  8: { name: "Island Corridor", par: 4, blueMetres: 384, forwardMetres: 330, description: "The fairway occupies a calm island-like corridor between connected water edges. The safest line and the best scoring line are deliberately different." },
  9: { name: "Lakeside Turn", par: 4, blueMetres: 410, forwardMetres: 355, description: "A sweeping hole that begins the turn through the centre of the property. Water influences the sightline without removing a comfortable route to the green." },
  10: { name: "Crossing Fairway", par: 5, blueMetres: 520, forwardMetres: 448, description: "This strategic three-shot hole moves between bridges, trees, and open landing areas. Thoughtful positioning creates the clearest final approach." },
  11: { name: "Clubhouse Approach", par: 4, blueMetres: 375, forwardMetres: 324, description: "The clubhouse returns to view as the fairway moves through a quieter landscape edge. A well-positioned drive opens the green and removes the deepest sand from play." },
  12: { name: "Homeward Short", par: 3, blueMetres: 172, forwardMetres: 140, description: "A refined par three close to the social heart of the club. The compact green complex rewards a high, controlled approach." },
  13: { name: "Forest Bend", par: 4, blueMetres: 398, forwardMetres: 342, description: "Dense tropical planting shapes the outside of this bending fairway. Playing to the wider side provides the most dependable route into the green." },
  14: { name: "Western Reach", par: 5, blueMetres: 505, forwardMetres: 438, description: "A broad western fairway gives players several ways to build the hole. The final approach is framed by native planting, water, and carefully placed sand." },
  15: { name: "Mountain Stretch", par: 4, blueMetres: 388, forwardMetres: 335, description: "A composed fairway opens toward the Mt. Isarog landscape. Its scale encourages a full drive before a more exacting approach to the raised target." },
  16: { name: "Northern Crossing", par: 3, blueMetres: 182, forwardMetres: 148, description: "The northern water network creates a dramatic one-shot setting. A generous putting surface is balanced by a demanding carry and shifting wind." },
  17: { name: "Lake Edge", par: 4, blueMetres: 405, forwardMetres: 350, description: "The fairway follows the upper lake edge, offering a conservative route and a bolder line closer to the water. Position from the tee determines the angle home." },
  18: { name: "Home Green", par: 5, blueMetres: 515, forwardMetres: 446, description: "The closing hole returns to the clubhouse precinct in full view. A generous first landing area gives way to a memorable final approach beside the club." },
};

export function metresToYards(metres: number) {
  return Math.round(metres * 1.09361);
}
