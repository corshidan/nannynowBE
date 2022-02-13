DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "user_role";
DROP TABLE IF EXISTS "nanny_review";
DROP TABLE IF EXISTS "advert";

CREATE TABLE "user"(
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" INTEGER NOT NULL,
    "gender" VARCHAR(255) NOT NULL,
    "phone" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMP WITHOUT TIME ZONE
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "user_role"(
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255)  UNIQUE NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMP WITHOUT TIME ZONE
);
ALTER TABLE
    "user_role" ADD PRIMARY KEY("id");
CREATE TABLE "nanny_review"(
    "id" BIGSERIAL NOT NULL,
    "nanny_id" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "review" VARCHAR(255) NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMP WITHOUT TIME ZONE
);
ALTER TABLE
    "nanny_review" ADD PRIMARY KEY("id");
CREATE TABLE "advert"(
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" VARCHAR(255) NOT NULL,
    "area" VARCHAR(255) NOT NULL,
    "availability" VARCHAR(255) NOT NULL,
    "experience" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "deleted_at" TIMESTAMP WITHOUT TIME ZONE
);
ALTER TABLE
    "advert" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_role_foreign" FOREIGN KEY("role") REFERENCES "user_role"("id");
ALTER TABLE
    "nanny_review" ADD CONSTRAINT "nanny_review_nanny_id_foreign" FOREIGN KEY("nanny_id") REFERENCES "user"("id");
ALTER TABLE
    "nanny_review" ADD CONSTRAINT "nanny_review_parent_id_foreign" FOREIGN KEY("parent_id") REFERENCES "user"("id");


CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_user
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_review
BEFORE UPDATE ON nanny_review
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_advert
BEFORE UPDATE ON advert
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_role
BEFORE UPDATE ON user_role
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO user_role(name) VALUES ('nanny');
INSERT INTO "user" (username, first_name, last_name, email, password, role, gender, phone) VALUES ('naughty', 'naomi', 'lynks', 'naomi@gmail.com', 'qwerty', '1', 'female', '+385555555');
