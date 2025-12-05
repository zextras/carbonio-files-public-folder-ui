FROM --platform=$BUILDPLATFORM backplane/jq:latest@sha256:7356453dcc4afa6c77261dd56168539f407f6b743c44fa03351a59b46d7cb197 AS builder

# Define path variables
ENV IRIS_BASE_PATH="/opt/zextras/web/iris" \
    WEB_PATH="/opt/zextras/web/iris/carbonio-files-public-folder-ui"

# Copy dist first so we can read component.json
COPY dist /tmp/dist

# Extract COMMIT_ID and set up directories
RUN mkdir -p "${WEB_PATH}" \
    && mv /tmp/dist/* "${WEB_PATH}"

# Final stage - built for all target platforms
FROM backplane/jq:latest@sha256:7356453dcc4afa6c77261dd56168539f407f6b743c44fa03351a59b46d7cb197

# Re-define path variable for final stage
ENV IRIS_BASE_PATH="/opt/zextras/web/iris"

# Just copy the prepared files
COPY --from=builder /opt/zextras /opt/zextras
