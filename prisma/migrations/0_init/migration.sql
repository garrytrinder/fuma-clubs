-- CreateTable
CREATE TABLE "fixtures" (
    "fixture_id" SERIAL NOT NULL,
    "home_team_id" INTEGER NOT NULL,
    "away_team_id" INTEGER NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "tournament_round_id" INTEGER NOT NULL,

    CONSTRAINT "fixtures_pkey" PRIMARY KEY ("fixture_id")
);

-- CreateTable
CREATE TABLE "match_event_types" (
    "match_event_type_id" SERIAL NOT NULL,
    "match_event_type" VARCHAR(50) NOT NULL,

    CONSTRAINT "match_event_types_pkey" PRIMARY KEY ("match_event_type_id")
);

-- CreateTable
CREATE TABLE "platforms" (
    "platform_id" SERIAL NOT NULL,
    "platform_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("platform_id")
);

-- CreateTable
CREATE TABLE "players" (
    "player_id" SERIAL NOT NULL,
    "team_id" INTEGER,
    "discord_id" VARCHAR(255) NOT NULL,
    "discord_username" VARCHAR(255) NOT NULL,
    "platform_username" VARCHAR(255),
    "platform_id" INTEGER,
    "country" VARCHAR(255),

    CONSTRAINT "players_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "results" (
    "result_id" SERIAL NOT NULL,
    "fixture_id" INTEGER NOT NULL,
    "home_team_score" INTEGER NOT NULL,
    "away_team_score" INTEGER NOT NULL,
    "after_extra_time" BOOLEAN DEFAULT false,
    "penalties" BOOLEAN DEFAULT false,
    "home_team_penalties" INTEGER,
    "away_team_penalties" INTEGER,
    "youtube_link" VARCHAR(255),
    "twitch_link" VARCHAR(255),

    CONSTRAINT "results_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "teams" (
    "team_id" SERIAL NOT NULL,
    "team_name" VARCHAR(255) NOT NULL,
    "team_code" VARCHAR(255) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "tournament_rounds" (
    "tournament_round_id" SERIAL NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "round_start_date" DATE NOT NULL,
    "round_end_date" DATE NOT NULL,
    "round_number" INTEGER NOT NULL,

    CONSTRAINT "tournament_rounds_pkey" PRIMARY KEY ("tournament_round_id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "tournament_id" SERIAL NOT NULL,
    "tournament_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("tournament_id")
);

-- AddForeignKey
ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("tournament_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("platform_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_fixture_id_fkey" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("fixture_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tournament_rounds" ADD CONSTRAINT "tournament_rounds_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("tournament_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

