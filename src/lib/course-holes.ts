export type HoleProfile = {
  name: string;
  par: number;
  blueMetres: number;
  yards: number;
  forwardMetres: number;
  description: string;
};

/** Official back-tee figures transcribed from the supplied CamSur Golf Course scorecard. */
export const HOLE_PROFILES: Record<number, HoleProfile> = {
  1: { name: "Opening Fairway", par: 4, blueMetres: 411, yards: 450, forwardMetres: 330, description: "The opening drive begins close to the club precinct and moves into a generous fairway. The preferred side leaves a clear angle to a green protected by a measured arrangement of bunkers." },
  2: { name: "Villa Corridor", par: 5, blueMetres: 526, yards: 575, forwardMetres: 445, description: "A long, flowing hole beside the villa edge. Players can advance safely in stages or challenge the narrowing landing area to create a shorter approach." },
  3: { name: "Central Approach", par: 4, blueMetres: 326, yards: 357, forwardMetres: 350, description: "A broad central corridor rewards a confident tee shot. The approach tightens around sculpted sand, asking for precise distance control into the green." },
  4: { name: "Upper Green", par: 3, blueMetres: 141, yards: 154, forwardMetres: 145, description: "A compact one-shot hole framed by palms and bright bunkering. Its open view makes club selection simple, but the exposed green still demands an accurate strike." },
  5: { name: "Peninsula", par: 4, blueMetres: 340, yards: 372, forwardMetres: 315, description: "Water defines the visual character of this peninsula hole. A controlled drive sets up an approach where placement matters more than raw distance." },
  6: { name: "Eastern Edge", par: 3, blueMetres: 113, yards: 124, forwardMetres: 455, description: "The route stretches along the eastern course edge with room to play away from trouble. Stronger players may take on the corner to improve their third-shot position." },
  7: { name: "Palm Crossing", par: 5, blueMetres: 473, yards: 517, forwardMetres: 132, description: "A short hole across a natural break in the landscape. The green is visible from the tee, while surrounding palms and sand sharpen the target." },
  8: { name: "Island Corridor", par: 4, blueMetres: 441, yards: 482, forwardMetres: 330, description: "The fairway occupies a calm island-like corridor between connected water edges. The safest line and the best scoring line are deliberately different." },
  9: { name: "Lakeside Turn", par: 3, blueMetres: 147, yards: 161, forwardMetres: 355, description: "A sweeping hole that begins the turn through the centre of the property. Water influences the sightline without removing a comfortable route to the green." },
  10: { name: "Crossing Fairway", par: 4, blueMetres: 354, yards: 387, forwardMetres: 448, description: "This strategic three-shot hole moves between bridges, trees, and open landing areas. Thoughtful positioning creates the clearest final approach." },
  11: { name: "Clubhouse Approach", par: 5, blueMetres: 527, yards: 577, forwardMetres: 324, description: "The clubhouse returns to view as the fairway moves through a quieter landscape edge. A well-positioned drive opens the green and removes the deepest sand from play." },
  12: { name: "Homeward Short", par: 4, blueMetres: 425, yards: 465, forwardMetres: 140, description: "A refined par three close to the social heart of the club. The compact green complex rewards a high, controlled approach." },
  13: { name: "Forest Bend", par: 3, blueMetres: 165, yards: 181, forwardMetres: 342, description: "Dense tropical planting shapes the outside of this bending fairway. Playing to the wider side provides the most dependable route into the green." },
  14: { name: "Western Reach", par: 4, blueMetres: 339, yards: 371, forwardMetres: 438, description: "A broad western fairway gives players several ways to build the hole. The final approach is framed by native planting, water, and carefully placed sand." },
  15: { name: "Mountain Stretch", par: 3, blueMetres: 200, yards: 219, forwardMetres: 335, description: "A composed fairway opens toward the Mt. Isarog landscape. Its scale encourages a full drive before a more exacting approach to the raised target." },
  16: { name: "Northern Crossing", par: 5, blueMetres: 499, yards: 546, forwardMetres: 148, description: "The northern water network creates a dramatic one-shot setting. A generous putting surface is balanced by a demanding carry and shifting wind." },
  17: { name: "Lake Edge", par: 5, blueMetres: 505, yards: 552, forwardMetres: 350, description: "The fairway follows the upper lake edge, offering a conservative route and a bolder line closer to the water. Position from the tee determines the angle home." },
  18: { name: "Home Green", par: 4, blueMetres: 330, yards: 361, forwardMetres: 446, description: "The closing hole returns to the clubhouse precinct in full view. A generous first landing area gives way to a memorable final approach beside the club." },
};

export function metresToYards(metres: number) {
  return Math.round(metres * 1.09361);
}

/**
 * Posisyon ng bawat butas sa masterplan, bilang porsiyento ng lapad at taas
 * ng larawan — kaya tama sila kahit anong sukat ng screen.
 *
 * Nandito sila sa lib at hindi sa iisang component dahil dalawa na ang
 * gumagamit: ang CourseRoutingMap at ang maliit na mapa sa Scorecard. Kapag
 * may dalawang kopya nito, tiyak na maghihiwalay sila.
 *
 * TODO (para sa club): tantiya ang mga coordinate na ito — inilagay sila sa
 * gitna ng bawat nakikitang fairway corridor sa masterplan, hindi galing sa
 * sinukat na drawing. Kapag dumating ang opisyal na numbered routing, ang
 * array na ito lang ang kailangang ayusin.
 */
export const HOLE_POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: 36.5, y: 77.6 },
  2: { x: 49.88, y: 86.36 },
  3: { x: 74.91, y: 78.11 },
  4: { x: 87.3, y: 60.5 },
  5: { x: 73.6, y: 66.8 },
  6: { x: 66.6, y: 81.64 },
  7: { x: 74.46, y: 56.75 },
  8: { x: 61, y: 63 },
  9: { x: 49.9, y: 75.1 },
  10: { x: 41.86, y: 37.72 },
  11: { x: 70.57, y: 13.06 },
  12: { x: 74.09, y: 21.98 },
  13: { x: 33.7, y: 24.1 },
  14: { x: 34.5, y: 30 },
  15: { x: 38, y: 52.8 },
  16: { x: 24.9, y: 37.1 },
  17: { x: 18.41, y: 44.92 },
  18: { x: 33.6, y: 69 },
};

/** Ang pinakabagong masterplan na kasama ng HOLE_POSITIONS sa itaas. */
export const COURSE_PLAN_IMAGE = "/golf/course-map-master-source-v1.png";
