
public ActionResult List(int page = 1, int pageSize = EmploymentHelpers.DefaultPageSizeEmploymentList, int? advancedQueryId = null, int? extraFilterId = null, bool showEndedEmployments = false)
        {
            var cookie = Request.Cookies["showCardView"];
            if (cookie == null || cookie.Value == "false")
            {
                if (advancedQueryId == null)
                {
                    advancedQueryId = _advancedQueryService.GetUserDefaultQueryId(_connectionInfo.UserId, nameof(EmployeeFileListRowDTO));
                }

                var employmentFiles = _employmentService.GetEmploymentList(showEndedEmployments, advancedQueryId, extraFilterId, Request.QueryString.CreateEmployeeListOrderBy, page, pageSize);

                _dependencyInjectionController.Get<IAuditLogService>().LogAdvancedQueryFilter(_dependencyInjectionController, advancedQueryId.GetValueOrDefault(), extraFilterId.GetValueOrDefault(), new AuditHelper().GetIdentity());

                ViewBag.AdvancedQueryId = advancedQueryId;
                ViewBag.ExtraFilterId = extraFilterId;
                ViewBag.Data = employmentFiles.Result;
                ViewBag.TotalCount = employmentFiles.TotalCount;
                ViewBag.ShowEndedEmployments = showEndedEmployments;

                var columnsDatabaseSettings = _dependencyInjectionController.Get<IGridColumnService>().GetGridColumns(GridType.Employments);

                var grid = CreateEmploymentGrid(employmentFiles, columnsDatabaseSettings, pageSize, RoleType.Employee.ToString());

                ViewBag.Columns = grid.Columns;
                ViewBag.Pager = grid.Pager;

                return View("Employment/List",
                            new ListModel<EmployeeFileListRowDTO>
                            {
                                Filter = (EmployeeFileListRowDTO)TempData["EmploymentListFilter"] ?? new EmployeeFileListRowDTO(),
                                PageSize = pageSize,
                                ShowEndedEmployments = showEndedEmployments
                            });
            }
            else
            {
                ViewBag.Hide = false;
                return View("Employment/Card");
            }
        }