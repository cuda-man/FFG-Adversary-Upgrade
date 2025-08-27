/**
 * FFG SWRPG Adversary Automation
 * Listens to dice pool building and upgrades difficulty
 * if the targeted actor has the Adversary talent.
 */

Hooks.on("ffgDicePoolBuilder", (pool, data) => {
  // Collect targets
  const targets = Array.from(game.user.targets);
  if (targets.length === 0) return;

  for (let target of targets) {
    const targetActor = target.actor;
    if (!targetActor) continue;

    // Look for "Adversary" item on target
    const adversaryItem = targetActor.items.find(i =>
      i.name.toLowerCase().startsWith("adversary")
    );

    if (adversaryItem) {
      const ranks = adversaryItem.system?.ranks?.current || 0;

      if (ranks > 0) {
        // Upgrade difficulty ranks times
        for (let i = 0; i < ranks; i++) {
          pool.upgradeDifficulty();
        }

        ui.notifications.info(
          `Adversary ${ranks}: Upgraded difficulty of check against ${targetActor.name}`
        );
      }
    }
  }
});

