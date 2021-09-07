/**
 * System for Zombicide RPG: Chronicles
 * Author: iMike
 */

// Import Modules


import { DuneActor } from "./documents/actor.mjs";
import { DuneItem } from "./documents/item.mjs";

import { DuneActorSheet } from "./sheets/actor-sheet.mjs";
import { DuneItemSheet } from "./sheets/item-sheet.mjs";

import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { DUNE } from "./helpers/config.mjs"

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
  console.log(`Initializing Dune System`);

  game.dune = {
    DuneActor,
    DuneItem
  };

  CONFIG.DUNE = DUNE;

  /**
   * Set an initiative formula for the system. This will be updated later.
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.documentClass = DuneActor;
  CONFIG.Item.documentClass = DuneItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("dune", DuneActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("dune", DuneItemSheet, { makeDefault: true });

  // Preload template partials
  await preloadHandlebarsTemplates();
});

Hooks.once("ready", function() {
  // include steps that need to happen after Foundry has fully loaded here.
});

Handlebars.registerHelper('isdefined', function (value) {
  console.log(value);
  return (value !== undefined && value !== "");
});
