export function hardSkillToEditHardSkill(hardSkill: HardSkill): EditHardSkill {
  const { id, ...rest } = hardSkill;

  return rest;
}
