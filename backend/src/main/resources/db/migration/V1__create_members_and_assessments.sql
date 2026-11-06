CREATE TABLE members (
    id UUID PRIMARY KEY,
    email VARCHAR(320) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    age_eligibility_confirmed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    terms_accepted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    terms_version VARCHAR(40) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE assessments (
    member_id UUID PRIMARY KEY REFERENCES members (id) ON DELETE CASCADE,
    form_version INTEGER NOT NULL,
    submission_id UUID NOT NULL,
    encrypted_answers BYTEA NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL
);
