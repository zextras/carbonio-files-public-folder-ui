FROM --platform=$BUILDPLATFORM docker.io/backplane/jq:latest AS builder

# The base image defaults to the unprivileged "nobody" user, which cannot write under /opt
USER root


# Define path variables
ENV IRIS_BASE_PATH="/opt/zextras/web/iris" \
    WEB_PATH="/opt/zextras/web/iris/carbonio-files-public-folder-ui"

# Copy dist first so we can read component.json
COPY dist /tmp/dist

# backplane/jq:latest defaults to a non-root user (USER nobody as of
# 2026-08-20); reset to root so the entrypoint can write components.json.
USER root

# Extract COMMIT_ID and set up directories
RUN mkdir -p "${WEB_PATH}" \
    && mv /tmp/dist/* "${WEB_PATH}"

# Final stage - built for all target platforms
FROM docker.io/backplane/jq:latest

# Re-define path variable for final stage
ENV IRIS_BASE_PATH="/opt/zextras/web/iris"

# backplane/jq:latest defaults to a non-root user (USER nobody as of
# 2026-08-20); reset to root so the entrypoint can write components.json.
USER root

# Just copy the prepared files
COPY --from=builder /opt/zextras /opt/zextras
