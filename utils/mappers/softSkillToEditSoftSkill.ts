export function softSkillToEditSoftSkill(softSkill: SoftSkill): EditSoftSkill {
  const { id, ...rest } = softSkill;

  return rest;
}
