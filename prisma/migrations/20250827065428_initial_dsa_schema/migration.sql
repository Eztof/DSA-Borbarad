-- CreateTable
CREATE TABLE "races" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "muMod" INTEGER NOT NULL DEFAULT 0,
    "klMod" INTEGER NOT NULL DEFAULT 0,
    "inMod" INTEGER NOT NULL DEFAULT 0,
    "chMod" INTEGER NOT NULL DEFAULT 0,
    "ffMod" INTEGER NOT NULL DEFAULT 0,
    "geMod" INTEGER NOT NULL DEFAULT 0,
    "koMod" INTEGER NOT NULL DEFAULT 0,
    "kkMod" INTEGER NOT NULL DEFAULT 0,
    "specialAbilities" TEXT,
    "restrictions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "races_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cultures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "languages" TEXT,
    "scripts" TEXT,
    "advantages" TEXT,
    "disadvantages" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cultures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "apCost" INTEGER NOT NULL DEFAULT 0,
    "muMin" INTEGER NOT NULL DEFAULT 8,
    "klMin" INTEGER NOT NULL DEFAULT 8,
    "inMin" INTEGER NOT NULL DEFAULT 8,
    "chMin" INTEGER NOT NULL DEFAULT 8,
    "ffMin" INTEGER NOT NULL DEFAULT 8,
    "geMin" INTEGER NOT NULL DEFAULT 8,
    "koMin" INTEGER NOT NULL DEFAULT 8,
    "kkMin" INTEGER NOT NULL DEFAULT 8,
    "specialAbilities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advantages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "apCost" INTEGER NOT NULL,
    "requirements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "advantages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disadvantages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "apValue" INTEGER NOT NULL,
    "requirements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disadvantages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "special_abilities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "apCost" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "requirements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "special_abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "attribute1" TEXT NOT NULL,
    "attribute2" TEXT NOT NULL,
    "attribute3" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'Normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "talents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spells" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "property" TEXT NOT NULL,
    "tradition" TEXT NOT NULL,
    "attribute1" TEXT NOT NULL,
    "attribute2" TEXT NOT NULL,
    "attribute3" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "aspCost" TEXT NOT NULL,
    "components" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liturgies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "god" TEXT NOT NULL,
    "aspect" TEXT NOT NULL,
    "attribute1" TEXT NOT NULL,
    "attribute2" TEXT NOT NULL,
    "attribute3" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "kpCost" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "liturgies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "heroes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "cultureId" TEXT NOT NULL,
    "professionId" TEXT NOT NULL,
    "mu" INTEGER NOT NULL DEFAULT 8,
    "kl" INTEGER NOT NULL DEFAULT 8,
    "in" INTEGER NOT NULL DEFAULT 8,
    "ch" INTEGER NOT NULL DEFAULT 8,
    "ff" INTEGER NOT NULL DEFAULT 8,
    "ge" INTEGER NOT NULL DEFAULT 8,
    "ko" INTEGER NOT NULL DEFAULT 8,
    "kk" INTEGER NOT NULL DEFAULT 8,
    "lebenspunkte" INTEGER NOT NULL DEFAULT 30,
    "astralpunkte" INTEGER NOT NULL DEFAULT 0,
    "karmapunkte" INTEGER NOT NULL DEFAULT 0,
    "currentLp" INTEGER NOT NULL DEFAULT 30,
    "currentAsp" INTEGER NOT NULL DEFAULT 0,
    "currentKp" INTEGER NOT NULL DEFAULT 0,
    "usedAp" INTEGER NOT NULL DEFAULT 0,
    "totalAp" INTEGER NOT NULL DEFAULT 900,
    "height" INTEGER,
    "weight" INTEGER,
    "hairColor" TEXT,
    "eyeColor" TEXT,
    "background" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_advantages" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "advantageId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "hero_advantages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_disadvantages" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "disadvantageId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "hero_disadvantages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_special_abilities" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "specialAbilityId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "hero_special_abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_talents" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hero_talents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_spells" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hero_spells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_liturgies" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "liturgyId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hero_liturgies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_items" (
    "id" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "weight" DOUBLE PRECISION,
    "value" DOUBLE PRECISION,
    "category" TEXT NOT NULL,
    "damage" TEXT,
    "protection" INTEGER,
    "encumbrance" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "races_name_key" ON "races"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cultures_name_key" ON "cultures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "professions_name_key" ON "professions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "advantages_name_key" ON "advantages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "disadvantages_name_key" ON "disadvantages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "special_abilities_name_key" ON "special_abilities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "talents_name_key" ON "talents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "spells_name_key" ON "spells"("name");

-- CreateIndex
CREATE UNIQUE INDEX "liturgies_name_key" ON "liturgies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hero_advantages_heroId_advantageId_key" ON "hero_advantages"("heroId", "advantageId");

-- CreateIndex
CREATE UNIQUE INDEX "hero_disadvantages_heroId_disadvantageId_key" ON "hero_disadvantages"("heroId", "disadvantageId");

-- CreateIndex
CREATE UNIQUE INDEX "hero_special_abilities_heroId_specialAbilityId_key" ON "hero_special_abilities"("heroId", "specialAbilityId");

-- CreateIndex
CREATE UNIQUE INDEX "hero_talents_heroId_talentId_key" ON "hero_talents"("heroId", "talentId");

-- CreateIndex
CREATE UNIQUE INDEX "hero_spells_heroId_spellId_key" ON "hero_spells"("heroId", "spellId");

-- CreateIndex
CREATE UNIQUE INDEX "hero_liturgies_heroId_liturgyId_key" ON "hero_liturgies"("heroId", "liturgyId");

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "races"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_cultureId_fkey" FOREIGN KEY ("cultureId") REFERENCES "cultures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "professions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_advantages" ADD CONSTRAINT "hero_advantages_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_advantages" ADD CONSTRAINT "hero_advantages_advantageId_fkey" FOREIGN KEY ("advantageId") REFERENCES "advantages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_disadvantages" ADD CONSTRAINT "hero_disadvantages_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_disadvantages" ADD CONSTRAINT "hero_disadvantages_disadvantageId_fkey" FOREIGN KEY ("disadvantageId") REFERENCES "disadvantages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_special_abilities" ADD CONSTRAINT "hero_special_abilities_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_special_abilities" ADD CONSTRAINT "hero_special_abilities_specialAbilityId_fkey" FOREIGN KEY ("specialAbilityId") REFERENCES "special_abilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_talents" ADD CONSTRAINT "hero_talents_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_talents" ADD CONSTRAINT "hero_talents_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_spells" ADD CONSTRAINT "hero_spells_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_spells" ADD CONSTRAINT "hero_spells_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "spells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_liturgies" ADD CONSTRAINT "hero_liturgies_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_liturgies" ADD CONSTRAINT "hero_liturgies_liturgyId_fkey" FOREIGN KEY ("liturgyId") REFERENCES "liturgies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
